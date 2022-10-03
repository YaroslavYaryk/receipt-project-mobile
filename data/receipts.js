import Receipt from "../models/Receipt";

var RECEIPTS = [
   new Receipt(
      10,
      2,
      3,
      "Basshunter 24.-26. August 24. August - Namsos 25. August - Kongsberg",
      3,
      "Travel",
      [
         {
            id: 10,
            url: "http://192.168.0.109:8000/media/photo/Data22/09/23/ph1_J794Zqr.png",
         },
         {
            id: 11,
            url: "http://192.168.0.109:8000/media/photo/Data22/09/23/ph2.jpeg",
         },
         {
            id: 13,
            url: "http://192.168.0.109:8000/media/photo/Data22/09/24/room.jpg",
         },
         {
            id: 14,
            url: "http://192.168.0.109:8000/media/photo/Data22/09/25/icon.png",
         },
      ],
      "some company",
      "2022-09-23",
      5000,
      "",
      "something",
      "no persons",
      "comment",
      "http://192.168.0.109:8000/media/exel/Data22/09/29/receipt_10_MMUJQPG.pdf"
   ),
   new Receipt(
      11,
      2,
      3,
      "new project",
      3,
      "Travel",
      [
         {
            id: 11,
            url: "http://192.168.0.109:8000/media/photo/Data22/09/23/ph2.jpeg",
         },
         {
            id: 13,
            url: "http://192.168.0.109:8000/media/photo/Data22/09/24/room.jpg",
         },
      ],
      "some company",
      "2022-09-23",
      5000,
      "",
      "something",
      "no persons",
      "comment",
      "http://192.168.0.109:8000/media/pdfs/receipt_12.pdf"
   ),
   new Receipt(
      233,
      2,
      3,
      "new project",
      3,
      "Travel",
      [
         {
            id: 13,
            url: "http://192.168.0.109:8000/media/photo/Data22/09/24/room.jpg",
         },
      ],
      "some company",
      "2022-09-23",
      5000,
      "",
      "something",
      "no persons",
      "comment",
      "http://192.168.0.109:8000/media/pdfs/receipt_13.pdf"
   ),
];

export default RECEIPTS;
