import SendData from '../../components/controls/sendData';

const carBrand = [
  'Acura', 'Alfa Romeo', 'Alpine', 'Apollo', 'Apple', 'Aston Martin', 'Audi', 'Automobili Pininfarina', 'Bentley', 'BMW', 'Bollinger',
  'Brilliance', 'Bugatti', 'Buick', 'BYD', 'Cadillac', 'Chana', 'Chery', 'Chevrolet', 'Chrysler', 'Citroen', 'Continental', 'CUPRA',
  'Dacia', 'Daewoo', 'Daihatsu', 'Datsun', 'Detroit Electric', 'Dodge', 'DS Automobiles', 'FAW', 'Ferrari', 'Fiat', 'Fisker', 'Ford',
  'Foxtron', 'Geely', 'Genesis', 'GMC', 'Great Wall', 'Haval', 'Honda', 'Hummer', 'Hyundai', 'Ineos', 'Infiniti', 'Iran Khodro', 'JAC',
  'Jaguar', 'Jeep', 'JETOUR', 'KIA', 'Koenigsegg', 'Lada', 'Lamborghini', 'Lancia', 'Land Rover', 'Lexus', 'Lifan', 'Lincoln', 'Lordstown',
  'Lotus', 'Lucid', 'LvChi', 'Lynk & Co', 'Maserati', 'Maybach', 'Mazda', 'MCLaren', 'Mercedes-Benz', 'MG', 'MINI', 'Mitsubishi', 'Nikola',
  'NIO', 'Nissan', 'Opel', 'Pagani', 'Peugeot', 'Polestar', 'Porsche', 'Qoros', 'Range Rover', 'Ravon', 'Renault', 'Rimac', 'Rivian',
  'Rolls-Royce', 'Saab', 'Saipa', 'SEAT', 'Skoda', 'smart', 'SsangYong', 'SSC North America', 'Stellantis', 'Subaru', 'Suzuki', 'Tata',
  'Tesla', 'Torsus', 'Toyota', 'VinFast', 'Volkswagen', 'Volvo', 'Xpeng', 'Zotye',
];
const carModal = [
  'Durango', 'Ram', 'Challenger', 'Charger', 'Grand Caravan', 'X7', 'X5', 'X3', 'X6 M', 'X6', 'X1', 'X4', 'C3 Aircross', 'C5 Aircross', 'Duster', 'CR-V', 'Corolla',
  'C4 Cactus', 'DS3 Crossback', 'C1', 'C3', 'Berlingo Multispace', 'DS4 Crossback', 'UX 250h', 'NX 300h', 'LC 500', 'RX 350/200t', 'Rapid', 'Largus',
  'IS 200t', 'LS 500h', 'RX', 'ES 200/250/350', 'Hatchback', 'CX-5', 'Sedan', 'CX-30', 'CX-9', 'CX-3', 'MX-5 Roadster', 'Phantom', 'Camry', 'Polo',
  'Cullinan', 'Ghost', 'Dawn', 'Duster', 'Arkana', 'Sandero', 'Logan', 'Trafic Fourgon', 'Logan MCV', 'Captur', 'Kadjar', 'RAV4', 'Rio', 'Creta', 'Solaris',
];

interface Obj {
  name: string;
  color: string;
  id?: number;
}

class Generate {
  static generate(): void {
    const dataGenerate: string[] = [];
    for (let i = 0; i < 100; i += 1) {
      const collor1 = Math.floor(Math.random() * (255 - 1) + 1);
      const collor2 = Math.floor(Math.random() * (255 - 1) + 1);
      const collor3 = Math.floor(Math.random() * (255 - 1) + 1);
      const brand = carBrand[Math.floor(Math.random() * (carBrand.length - 0) + 0)];
      const modal = carModal[Math.floor(Math.random() * (carModal.length - 0) + 0)];
      const collor = `#${collor1.toString(16)}${collor2.toString(16)}${collor3.toString(16)}`;
      const obj: Obj = {
        name: `${brand} ${modal}`,
        color: collor,
      };
      const strObj = JSON.stringify(obj);
      dataGenerate.push(strObj);
    }
    const requests = dataGenerate.map((el) => SendData.send('http://127.0.0.1:3000/garage', el));
    Promise.all(requests)
      .then(() => {
        window.location.reload();
      });
  }
}

export default Generate;
