import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})
export class NewFormComponent implements OnInit {
  date;
  item;
  selectedCharge: string;
  selectedStock: string;

  constructor(public af:AngularFireDatabase) {
    this.item = af.object('/msic/stock');
  }
  ngOnInit() {
  }

  charge = [
    { value: 'no-charge', viewCharge: 'No Charge' },
    { value: 'all-charge', viewCharge: 'Charge All' },
    { value: 'other-charge', viewCharge: 'Other Charge' }
  ];

  stock = [
    { value: '30MicronMetalilisedBBOP', viewStock: '30 Micron - Metallised BOPP' },
    { value: '39MicronClearCoated3', viewStock: '38 Micron - Clear PVDC Coated BOPP' },
    { value: 'ArconvertLaidWhite90', viewStock: 'ARCONVERT Laid White 90' },
    { value: '2mAveryCleanOnClear', viewStock: '2.0m Avery Clear on clear' },
    { value: 'Avery400GlossWhiteVinyl1', viewStock: 'Avery 400 Gloss White Vinyl - Removable' },
    { value: 'FassonEstate', viewStock: 'Estate #8 PE' },
    { value: 'EstesSFT12', viewStock: 'Estes SF T12 - 45mic' },
    { value: 'FassonPP50Clear', viewStock: 'Fasson PP50 Clear TC BOPP' },
    { value: 'FassonPrimaxPlus', viewStock: 'Fasson Primax Plus POF - Removable' },
    { value: 'FluroPink250mm', viewStock: 'Pink - 250mm' },
    { value: 'KantacC51', viewStock: 'Kantac C-51' },
    { value: 'KamtacC58', viewStock: 'Kantac C-58' },
    { value: 'MacCoatFreezer', viewStock: 'Freezer' },
    { value: 'MacCoatRemoveable', viewStock: 'MacCoat Removable' },
    { value: 'MacFluroYellow', viewStock: 'MacFluro - Yellow' },
    { value: 'MacFluroRed', viewStock: 'MacFluro - Red' },
    { value: 'MacPropyWhite', viewStock: 'MacPropy White' },
    { value: 'MacTacRheomdBOPP', viewStock: 'MacTac Chrome BOPP PureTac' },
    { value: 'MacTacClearBOPP', viewStock: 'MacTac Clear BOPP PureTac' },
    { value: 'MacTacPlat', viewStock: 'MacTac Platinum' },
    { value: 'ManterIDPPPClearGloss', viewStock: 'Manter IDP PP Clear Gloss' },
    { value: 'MitsiHishiPet45u280mm', viewStock: 'Mitsubishi Hishi PET 45u - 280mm' },
    { value: 'MitshiPet45u325mm', viewStock: 'Mitsubishi Hishi PET 45u - 325mm' },
    { value: 'OLTThermalTopCoat', viewStock: 'OLT Thermal Top Coated' },
    { value: 'PentallabelRigit45u', viewStock: 'Pentalabel Rigid PETG 45u - 340mm' },
    { value: 'PMCPPClearTC', viewStock: 'PMC PP Clear TC - Removable' },
    { value: 'PMCPPSilv333mm', viewStock: 'PMC PP Silver - 333mm' },
    { value: 'RaffwineChateau', viewStock: 'Raffwine Chateau' },
    { value: 'RaflatacClearPPTC50', viewStock: 'Raflatac Clear PP TC 50' },
    { value: 'RaflatePPSilv', viewStock: 'Raflatac PP Silver' },
    { value: 'RaflatacPPSilvPET', viewStock: 'Raflatac PP Silver on PET' },
    { value: 'RitramaDirTherm', viewStock: 'Ritrama Direct Thermal' },
    { value: 'RitramaFlurGreen', viewStock: 'Ritrama Fluro - Green' },
    { value: 'RitramaFlurOrange', viewStock: 'Ritrama Fluro - Orange - 250mm' },
    { value: 'RitramaLasJet70', viewStock: 'Ritrama Laser Jet 70' },
    { value: 'RitramaMirrorSilv', viewStock: 'Ritrama Mirror Silver' },
    { value: 'RitramaPPWhiteGloss', viewStock: 'Ritrama PP White Gloss' },
    { value: 'RocktakRPD120', viewStock: 'Rocktak RPD120 Glassine' },
    { value: 'RocktakRPD120Remov', viewStock: 'Rocktak RPD120 Removable PET25' },
    { value: 'SuppliedStock', viewStock: 'Supplied Stock' },
    { value: 'YenomDirThermal', viewStock: 'Yenom Direct Thermal - Removable' },
    { value: 'YenomGlossWhiteBOPP', viewStock: 'Yenom Gloss White BOPP' },
    { value: 'Other', viewStock: 'Other' }
    ];

}
