var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var skillssection = document.querySelector(".skills-section");
var btn = document.querySelector(".btn");
btn.addEventListener("click", function (e) {
    e.preventDefault();
    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "enter your skill";
    skillssection.appendChild(input);
});
var generateResumeButton = document.querySelector(".btn1");
generateResumeButton.addEventListener("click", function (e) {
    e.preventDefault();
    var nameInput = document.querySelector("#name");
    var emailInput = document.querySelector("#email");
    var educationInput = document.querySelector("#education");
    var workExperienceInput = document.querySelector("#work_experience");
    var skillsInputs = document.querySelectorAll(".skills-section input");
    var skillsArray = __spreadArray([], skillsInputs, true);
    var resumeTemplate = "\n    <h1>".concat(nameInput.value || "No Name", "</h1>\n    <h2>Contact Information</h2>\n    <ul>\n      <li>Email: ").concat(emailInput.value || "No Email", "</li>\n    </ul>\n    <h2>Education</h2>\n    <p>").concat(educationInput.value || "No Education Information", "</p>\n    <h2>Work Experience</h2>\n    <p>").concat(workExperienceInput.value || "No Work Experience", "</p>\n    <h2>Skills</h2>\n    <ul>\n      ").concat(skillsArray
        .map(function (skill) { return "<li>".concat(skill.value || "No Skill", "</li>"); })
        .join(""), "\n    </ul>\n  ");
    var resumeContainer = document.createElement("div");
    var downloadButton = document.createElement("button");
    resumeContainer.className = "resume-output";
    resumeContainer.innerHTML = resumeTemplate;
    document.body.innerHTML = "";
    document.body.prepend(resumeContainer);
    resumeContainer.appendChild(downloadButton);
    downloadButton.textContent = "Download as HTML";
    downloadButton.className = "download-button";
    downloadButton.addEventListener("click", function () {
        var blob = new Blob([resumeTemplate], { type: "text/plain" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "resume.txt";
        a.click();
        URL.revokeObjectURL(url);
    });
    var editButton = document.createElement("button");
    editButton.textContent = "Edit Resume";
    editButton.className = "edit-button";
    resumeContainer.appendChild(editButton);
    var isEditing = false;
    editButton.addEventListener("click", function () {
        var _a, _b, _c, _d;
        if (!isEditing) {
            // Switch to edit mode
            var nameField = document.querySelector(".resume-output h1");
            var emailField = document.querySelector(".resume-output ul li");
            var educationField = document.querySelector(".resume-output p:nth-of-type(1)");
            var experienceField = document.querySelector(".resume-output p:nth-of-type(2)");
            var skillsField_1 = document.querySelector(".resume-output ul:nth-of-type(2)");
            nameField.innerHTML = "<input type=\"text\" value=\"".concat((_a = nameField.textContent) === null || _a === void 0 ? void 0 : _a.trim(), "\" id=\"edit-name\" />");
            emailField.innerHTML = "Email: <input type=\"email\" value=\"".concat((_b = emailField.textContent) === null || _b === void 0 ? void 0 : _b.replace("Email: ", "").trim(), "\" id=\"edit-email\" />");
            educationField.innerHTML = "<textarea id=\"edit-education\">".concat((_c = educationField.textContent) === null || _c === void 0 ? void 0 : _c.trim(), "</textarea>");
            experienceField.innerHTML = "<textarea id=\"edit-experience\">".concat((_d = experienceField.textContent) === null || _d === void 0 ? void 0 : _d.trim(), "</textarea>");
            var skillItems = Array.from(skillsField_1.querySelectorAll("li"));
            skillsField_1.innerHTML = "";
            skillItems.forEach(function (skill) {
                var _a;
                var input = document.createElement("input");
                input.type = "text";
                input.value = ((_a = skill.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
                skillsField_1.appendChild(input);
            });
            editButton.textContent = "Save Changes";
            isEditing = true;
        }
        else {
            var editedName = document.querySelector("#edit-name").value;
            var editedEmail = document.querySelector("#edit-email").value;
            var editedEducation = document.querySelector("#edit-education").value;
            var editedExperience = document.querySelector("#edit-experience").value;
            var editedSkills = Array.from(document.querySelectorAll(".resume-output ul:nth-of-type(2) input")).map(function (input) { return input.value; });
            var nameField = document.querySelector(".resume-output h1");
            var emailField = document.querySelector(".resume-output ul li");
            var educationField = document.querySelector(".resume-output p:nth-of-type(1)");
            var experienceField = document.querySelector(".resume-output p:nth-of-type(2)");
            var skillsField_2 = document.querySelector(".resume-output ul:nth-of-type(2)");
            nameField.innerHTML = editedName;
            emailField.innerHTML = "Email: ".concat(editedEmail);
            educationField.innerHTML = editedEducation;
            experienceField.innerHTML = editedExperience;
            skillsField_2.innerHTML = "";
            editedSkills.forEach(function (skill) {
                var li = document.createElement("li");
                li.textContent = skill || "No Skill";
                skillsField_2.appendChild(li);
            });
            editButton.textContent = "Edit Resume";
            isEditing = false;
        }
    });
});
