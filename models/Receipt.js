class Receipt {
   constructor(
      id,
      user,
      project,
      projectName,
      category,
      categoryName,
      photos,
      company,
      date,
      price,
      description,
      business,
      persons,
      comment,
      file_document
   ) {
      this.id = id;
      this.user = user;
      this.project = project;
      this.projectName = projectName;
      this.category = category;
      this.categoryName = categoryName;
      this.photos = photos;
      this.company = company;
      this.date = date;
      this.price = price;
      this.description = description;
      this.business = business;
      this.persons = persons;
      this.comment = comment;
      this.file_document = file_document;
   }
}

export default Receipt;
