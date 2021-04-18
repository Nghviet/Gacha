const Main = artifacts.require("main");

module.exports = function (deployer) {
  deployer.deploy(Main)
  .then(instance => {
  	instance.addServant(1, "Artoria Pendragon", "Saber", 		 	5, 1734, 1000, 2222, 150, 80, 200);
  	instance.addServant(2, "Artoria Pendragon (Alter)", "Saber", 	4, 1708, 1000, 1854, 180, 80, 150);
  	instance.addServant(3, "Artoria Pendragon (LiLy)", "Saber",  	4, 1287, 1000, 1699, 80, 80, 120);
  	instance.addServant(4, "Altera", "Saber", 						5, 1907, 1000, 2039, 150, 80, 200);
  	instance.addServant(5, "Emiya", "Archer", 						4, 1566, 1000, 1843, 100, 80, 150);
  	instance.addServant(6, "Gilgamesh", "Archer", 					5, 1897, 1000, 1920, 150, 80, 150);
  	instance.addServant(7, "Euryale", "Archer", 					3, 1306, 1000, 1711, 120, 80, 150);
  	instance.addServant(8, "Arash", "Archer", 						1, 1057, 1000, 1424, 100, 80, 150);
  	instance.addServant(9, "Artoria Pendragon", "Saber", 			5, 1734, 1000, 2222, 150, 80, 200);
  	instance.addServant(10, "Cú Chulainn", "Lancer", 				3, 1334, 1000, 1726, 120, 80, 200);
  	instance.addServant(11, "Cú Chulainn (Prototype)", "Lancer", 	3, 1315, 1000, 1817, 120, 80, 200);
  	instance.addServant(12, "Jeanne d'Arc", "Ruler", 				5, 1482, 1000, 2420, 150, 80, 250);
  	instance.addServant(13, "Okita Souji", "Saber", 				5, 1865, 1000, 1939, 120, 80, 150);
  	instance.addServant(14, "Scáthach", "Lancer", 					5, 1758, 1000, 2174, 150, 80, 200);
  
    instance.addLocation("Chaldea", 0, "Dummy", 10000, 10, 100, 10, 10, 1, "BeastIII");
    instance.addLocation("Orleans", 1, "Jalter", 15000, 100, 100, 0, 0, 10, "Avenger");

  })
  .catch(err => {

  });
};
