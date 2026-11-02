const steps = [
  {
    name: "Aadhaar",
    referenceLabel: "Last 4 digits of test Aadhaar",
    referenceHelp: "Enter four made-up digits only. Never enter an Aadhaar number.",
  },
  {
    name: "PAN",
    referenceLabel: "Last 4 characters of test PAN",
    referenceHelp: "Enter four made-up letters or digits only. Never enter a real PAN.",
  },
  {
    name: "Bank",
    referenceLabel: "Last 4 digits of test bank account",
    referenceHelp: "Enter four made-up digits only. Never enter banking credentials.",
  },
];

const state = {
  currentStep: 0,
  identities: [],
  otp: "",
  attempts: 0,
  phase: "details",
};

const content = document.querySelector("#step-content");
const notice = document.querySelector("#notice");
const result = document.querySelector("#result");
const progressLabel = document.querySelector("#progress-label");
const progressCount = document.querySelector("#progress-count");
const progressTrack = document.querySelector(".progress-track");
const progressFill = document.querySelector("#progress-fill");
const indicators = [...document.querySelectorAll("[data-step-indicator]")];

function showNotice(message, type) {
  notice.textContent = message;
  notice.className = `notice is-${type}`;
  notice.hidden = false;
}

function clearNotice() {
  notice.hidden = true;
  notice.textContent = "";
  notice.className = "notice";
}

function updateProgress() {
  const completed = state.identities.length;
  const displayedStep = Math.min(state.currentStep + 1, steps.length);
  progressLabel.textContent = completed === steps.length ? "All steps complete" : `Step ${displayedStep} of ${steps.length}`;
  progressCount.textContent = `${completed}/${steps.length} complete`;
  progressFill.style.width = `${(completed / steps.length) * 100}%`;
  progressTrack.setAttribute("aria-valuenow", String(completed));

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("is-current", index === state.currentStep && completed < steps.length);
    indicator.classList.toggle("is-complete", index < completed);
    indicator.querySelector(".step-number").textContent = index < completed ? "✓" : String(index + 1);
  });
}

function renderDetails() {
  const step = steps[state.currentStep];
  content.innerHTML = `
    <h2>Verify your ${step.name} details</h2>
    <p class="step-description">For this demo, enter the same sample name and date of birth on every step.</p>
    <form id="details-form">
      <div class="field-grid">
        <div class="field">
          <label for="reference">${step.referenceLabel}</label>
          <input id="reference" name="reference" autocomplete="off" required maxlength="4" pattern="[A-Za-z0-9]{4}" aria-describedby="reference-help" placeholder="e.g. 1234">
          <p class="field-help" id="reference-help">${step.referenceHelp}</p>
        </div>
        <div class="field">
          <label for="legal-name">Sample full name</label>
          <input id="legal-name" name="legalName" autocomplete="off" required maxlength="80" placeholder="e.g. Alex Example">
        </div>
        <div class="field">
          <label for="date-of-birth">Sample date of birth</label>
          <input id="date-of-birth" name="dateOfBirth" type="date" required>
          <p class="field-help">Use a fictional date for this test.</p>
        </div>
      </div>
      <div class="form-actions">
        <span class="field-help">No information is uploaded or saved.</span>
        <button class="primary-button" type="submit">Continue to demo OTP <span aria-hidden="true">→</span></button>
      </div>
    </form>
  `;

  content.querySelector("#details-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const reference = String(data.get("reference")).trim();
    if (!/^[a-z0-9]{4}$/i.test(reference)) {
      showNotice("Enter exactly four letters or digits for this sample identifier.", "error");
      return;
    }

    const legalName = String(data.get("legalName")).trim().replace(/\s+/g, " ");
    const dateOfBirth = String(data.get("dateOfBirth"));
    if (!legalName || !dateOfBirth) return;

    state.identities[state.currentStep] = {
      name: legalName.toLocaleLowerCase(),
      dateOfBirth,
    };
    state.otp = String(Math.floor(100000 + Math.random() * 900000));
    state.attempts = 0;
    state.phase = "otp";
    clearNotice();
    renderOtp();
  });
}

function renderOtp() {
  const step = steps[state.currentStep];
  content.innerHTML = `
    <h2>Confirm your ${step.name} step</h2>
    <p class="step-description">A real service would send a code to a verified channel. This demo generates a local test code only.</p>
    <div class="demo-code" aria-label="Local demo code">
      <span>Your local demo code</span>
      <strong>${state.otp}</strong>
    </div>
    <form id="otp-form">
      <div class="field">
        <label for="otp">Enter the 6-digit code</label>
        <input id="otp" name="otp" inputmode="numeric" autocomplete="one-time-code" required minlength="6" maxlength="6" pattern="[0-9]{6}" placeholder="000000" aria-describedby="otp-help">
        <p class="field-help" id="otp-help">This code is shown above because no SMS or email is sent.</p>
      </div>
      <div class="form-actions">
        <button class="secondary-button" id="back-button" type="button">Back to details</button>
        <button class="primary-button" type="submit">Verify this step <span aria-hidden="true">→</span></button>
      </div>
    </form>
  `;

  content.querySelector("#back-button").addEventListener("click", () => {
    state.phase = "details";
    state.otp = "";
    clearNotice();
    renderDetails();
  });

  content.querySelector("#otp-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const enteredOtp = String(new FormData(form).get("otp")).trim();

    if (enteredOtp !== state.otp) {
      state.attempts += 1;
      const remaining = 3 - state.attempts;
      if (remaining > 0) {
        showNotice(`That code does not match. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`, "error");
      } else {
        showNotice("Too many incorrect attempts. Restart this demo to try again.", "error");
        content.querySelectorAll("input, button").forEach((element) => {
          element.disabled = true;
        });
        const restartButton = document.createElement("button");
        restartButton.className = "secondary-button";
        restartButton.type = "button";
        restartButton.textContent = "Start over";
        restartButton.addEventListener("click", restart);
        content.append(restartButton);
      }
      return;
    }

    state.phase = "details";
    state.otp = "";
    state.currentStep += 1;
    clearNotice();
    updateProgress();

    if (state.currentStep === steps.length) {
      renderResult();
      return;
    }

    renderDetails();
    showNotice(`${step.name} step completed: demo code verified.`, "success");
  });
}

function renderResult() {
  content.innerHTML = "";
  const firstIdentity = state.identities[0];
  const allMatch = state.identities.every((identity) =>
    identity.name === firstIdentity.name
    && identity.dateOfBirth === firstIdentity.dateOfBirth
  );

  result.hidden = false;
  result.className = allMatch ? "result" : "result is-denied";
  result.innerHTML = allMatch
    ? `<div class="result-icon" aria-hidden="true">✓</div>
       <h2>Sample details match</h2>
       <p>All three demo steps are complete and the sample name and date of birth match. This is not a real identity check.</p>
       <button class="secondary-button" id="restart-button" type="button">Start again</button>`
    : `<div class="result-icon" aria-hidden="true">!</div>
       <h2>Details do not match</h2>
       <p>The sample name or date of birth differs between steps. Access is denied in this demo.</p>
       <button class="secondary-button" id="restart-button" type="button">Start again</button>`;

  if (allMatch) {
    result.querySelector("h2").textContent = "Access granted (demo only)";
  }

  result.querySelector("#restart-button").addEventListener("click", restart);
  clearNotice();
}

function restart() {
  state.currentStep = 0;
  state.identities = [];
  state.otp = "";
  state.attempts = 0;
  state.phase = "details";
  result.hidden = true;
  result.innerHTML = "";
  clearNotice();
  updateProgress();
  renderDetails();
}

updateProgress();
renderDetails();
