var skillsRange = document.getElementById('skillsRange');
  var skillsOutput = document.getElementById('skillsOutput');
  skillsOutput.value = skillsRange.value; 


  skillsRange.oninput = function() {
    skillsOutput.value = this.value;
  }