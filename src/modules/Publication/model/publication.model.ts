export interface IPublication {
    _id?: string;
    userId: string ;
    description: string;
    createDate?: string;
    firstName: string;
    lastName: string;
    user: any;
    file?:Express.Multer.File;

  }
  /* fi postman yraja3li affichage hatha 
  {
    "description": "Ceci est une nouvelle publication de test",
    "createDate": "2024-05-01T09:22:39.234Z",
    "userId": "662fef2b8b6c99914afa426a",
    "firstName": "admin",
    "lastName": "admin",
    "_id": "663209df9456a7f9de7c3c85",
    "__v": 0
  }*/

  /* ce que le postman affiche losque publication est file : 
  {
    "description": "autre nouvelle publication de type file de test",
    "createDate": "2024-05-01T09:43:14.089Z",
    "userId": "662fef2b8b6c99914afa426a",
    "firstName": "admin",
    "lastName": "admin",
    "file": {
        "fieldname": "file",
        "originalname": "role scrum.jpg",
        "encoding": "7bit",
        "mimetype": "image/jpeg",
        "buffer": {
            "type": "Buffer",
            "data": [........
        */ 
  