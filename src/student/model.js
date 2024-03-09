module.exports = class Student {
  constructor(firstname, lastname, email, age, address, ville, region, code_postal, mother_names, father_names) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.age = age;
    this.address = address;
    this.ville = ville;
    this.region = region;
    this.code_postal = code_postal;
    this.mother_names = mother_names;
    this.father_names = father_names;
  }
}