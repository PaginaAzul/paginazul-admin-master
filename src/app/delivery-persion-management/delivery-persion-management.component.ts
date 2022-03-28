import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $;

@Component({
  selector: 'app-delivery-persion-management',
  templateUrl: './delivery-persion-management.component.html',
  styleUrls: ['./delivery-persion-management.component.css']
})
export class DeliveryPersionManagementComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader:ElementRef;
  searchForm:FormGroup;
  formvalidation: any = { submitted: false }
  userArr:any=[];
  pageNumber=1;
  limit:any;
  total:any;
  srNumber:any;
  dateValue: any;
  userId: any;
  nowDate2: any;
  todayDate: Date;
  dropDownData:any=[];
  dropDownData1:any=[];
  dropDownData2:any=[];
  addUserForm: any;
  activeImage: any = ''
  flag: number;
  buttonDisable: number;
  formdata = new FormData
  fileLength: any;
  id: any;
  editUserForm: FormGroup;
  name: any;
  email: any;
  gender: any;
  appLanguage: any;
  speakLanguage: any;
  dob: any;
  country: any;
  aboutUs: any;
  vihicleType: any;
  vehicleNumber: any;
  isuranceNumber: any;
  emergencyContact: any;
  vehicleType: any;
  insuranceNumber: any;
  deliveryPAboutUs: any;
  deliveryPEmergencyContact: any;
  totalItems: any;
  sendNotificationForm:any;
  sendNotificationToAllForm:any
  mailForm: any;
  dropDownData3: string[];
  dropDownData4: string[];
  minimumOfferLimitDelivery: any;
  orderForDeliveryDistance: any;
  dropDownData6: { "name": string; "dial_code": string; "code": string; }[];

  constructor(public service:AppService,public router: Router,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.searchFormVAlue()
    this.getViewData()
    window.scrollTo(0, 0);
    this.todayDate = new Date()
  }

  searchFormVAlue(){
    this.searchForm = new FormGroup({
      search : new FormControl('',),
      startDate : new FormControl('',),
      endDate : new FormControl('',)
    })

    this.addUserForm = new FormGroup({
      name: new FormControl('',[Validators.required] ),
      email: new FormControl('',Validators.compose([Validators.required, Validators.maxLength(254),Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])),
      mobileNumber: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern(/^[6-9]\d{9}$/)]),
      gender: new FormControl('',[Validators.required] ),
      dob: new FormControl('',[Validators.required] ),
      speakLanguage: new FormControl('',[Validators.required]),
      appLanguage: new FormControl('',[Validators.required]),
      country: new FormControl('', [Validators.required]),
      deliveryPAboutUs: new FormControl('',[Validators.required] ),
      vehicleType: new FormControl('',[Validators.required] ),
      vehicleNumber: new FormControl('',[Validators.required]),
      insuranceNumber: new FormControl('',[Validators.required]),
      deliveryPEmergencyContact: new FormControl('', [Validators.required]),
      countryCode: new FormControl('', [Validators.required]),
    
    })

    this.editUserForm = new FormGroup({
      name: new FormControl('',),
      email: new FormControl('',),
      gender: new FormControl('',),
      appLanguage: new FormControl('',),
      speakLanguage: new FormControl('',),
      country: new FormControl('', ),
      dob: new FormControl('',),
      deliveryPAboutUs: new FormControl('',),
      vehicleType: new FormControl('',),
      vehicleNumber: new FormControl('',),
      insuranceNumber: new FormControl('',),
      deliveryPEmergencyContact: new FormControl('', ),
      minimumOfferLimitDelivery: new FormControl('',[Validators.required,Validators.pattern(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/)]),
      orderForDeliveryDistance: new FormControl('',[Validators.required,Validators.pattern(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/)] ),
  
    })

    this.sendNotificationForm = new FormGroup({
      title: new FormControl('',[Validators.required]),
      message: new FormControl('', [Validators.required]),
    
    })

    this.sendNotificationToAllForm = new FormGroup({
      title: new FormControl('',[Validators.required]),
      message: new FormControl('', [Validators.required]),
    
    })

    this.mailForm = new FormGroup({
      message: new FormControl('', [Validators.required]),
    
    })

    this.dropDownData = ['Male', 'Female'],
    this.dropDownData1 = ['English', 'Arabic'],
    this.dropDownData2 = ['English', 'Arabic']
    this.dropDownData3 = ['India', 'Saudi Arabia']
    this.dropDownData4 = ['Two Wheeler', 'Four Wheeler']
    this.dropDownData6=[
      {
      "name": "Afghanistan",
      "dial_code": "+93",
      "code": "AF"
      },
      {
      "name": "Aland Islands",
      "dial_code": "+358",
      "code": "AX"
      },
      {
      "name": "Albania",
      "dial_code": "+355",
      "code": "AL"
      },
      {
      "name": "Algeria",
      "dial_code": "+213",
      "code": "DZ"
      },
      {
      "name": "AmericanSamoa",
      "dial_code": "+1 684",
      "code": "AS"
      },
      {
      "name": "Andorra",
      "dial_code": "+376",
      "code": "AD"
      },
      {
      "name": "Angola",
      "dial_code": "+244",
      "code": "AO"
      },
      {
      "name": "Anguilla",
      "dial_code": "+1 264",
      "code": "AI"
      },
      {
      "name": "Antarctica",
      "dial_code": "+672",
      "code": "AQ"
      },
      {
      "name": "Antigua",
      "dial_code": "+1268",
      "code": "AG"
      },
      {
      "name": "Argentina",
      "dial_code": "+54",
      "code": "AR"
      },
      {
      "name": "Armenia",
      "dial_code": "+374",
      "code": "AM"
      },
      {
      "name": "Aruba",
      "dial_code": "+297",
      "code": "AW"
      },
      {
      "name": "Australia",
      "dial_code": "+61",
      "code": "AU"
      },
      {
      "name": "Austria",
      "dial_code": "+43",
      "code": "AT"
      },
      {
      "name": "Azerbaijan",
      "dial_code": "+994",
      "code": "AZ"
      },
      {
      "name": "Bahamas",
      "dial_code": "+1 242",
      "code": "BS"
      },
      {
      "name": "Bahrain",
      "dial_code": "+973",
      "code": "BH"
      },
      {
      "name": "Bangladesh",
      "dial_code": "+880",
      "code": "BD"
      },
      {
      "name": "Barbados",
      "dial_code": "+1 246",
      "code": "BB"
      },
      {
      "name": "Belarus",
      "dial_code": "+375",
      "code": "BY"
      },
      {
      "name": "Belgium",
      "dial_code": "+32",
      "code": "BE"
      },
      {
      "name": "Belize",
      "dial_code": "+501",
      "code": "BZ"
      },
      {
      "name": "Benin",
      "dial_code": "+229",
      "code": "BJ"
      },
      {
      "name": "Bermuda",
      "dial_code": "+1 441",
      "code": "BM"
      },
      {
      "name": "Bhutan",
      "dial_code": "+975",
      "code": "BT"
      },
      {
      "name": "Bolivia",
      "dial_code": "+591",
      "code": "BO"
      },
      {
      "name": "Bosnia",
      "dial_code": "+387",
      "code": "BA"
      },
      {
      "name": "Botswana",
      "dial_code": "+267",
      "code": "BW"
      },
      {
      "name": "Brazil",
      "dial_code": "+55",
      "code": "BR"
      },
      {
      "name": "British Indian",
      "dial_code": "+246",
      "code": "IO"
      },
      {
      "name": "Brunei Darussalam",
      "dial_code": "+673",
      "code": "BN"
      },
      {
      "name": "Bulgaria",
      "dial_code": "+359",
      "code": "BG"
      },
      {
      "name": "Burkina Faso",
      "dial_code": "+226",
      "code": "BF"
      },
      {
      "name": "Burundi",
      "dial_code": "+257",
      "code": "BI"
      },
      {
      "name": "Cambodia",
      "dial_code": "+855",
      "code": "KH"
      },
      {
      "name": "Cameroon",
      "dial_code": "+237",
      "code": "CM"
      },
      {
      "name": "Canada",
      "dial_code": "+1",
      "code": "CA"
      },
      {
      "name": "Cape Verde",
      "dial_code": "+238",
      "code": "CV"
      },
      {
      "name": "Cayman Islands",
      "dial_code": "+ 345",
      "code": "KY"
      },
      {
      "name": "Central African Republic",
      "dial_code": "+236",
      "code": "CF"
      },
      {
      "name": "Chad",
      "dial_code": "+235",
      "code": "TD"
      },
      {
      "name": "Chile",
      "dial_code": "+56",
      "code": "CL"
      },
      {
      "name": "China",
      "dial_code": "+86",
      "code": "CN"
      },
      {
      "name": "Christmas Island",
      "dial_code": "+61",
      "code": "CX"
      },
      {
      "name": "Cocos",
      "dial_code": "+61",
      "code": "CC"
      },
      {
      "name": "Colombia",
      "dial_code": "+57",
      "code": "CO"
      },
      {
      "name": "Comoros",
      "dial_code": "+269",
      "code": "KM"
      },
      {
      "name": "Congo",
      "dial_code": "+242",
      "code": "CG"
      },
      {
      "name": "Congo",
      "dial_code": "+243",
      "code": "CD"
      },
      {
      "name": "Cook Islands",
      "dial_code": "+682",
      "code": "CK"
      },
      {
      "name": "Costa Rica",
      "dial_code": "+506",
      "code": "CR"
      },
      {
      "name": "Cote d'Ivoire",
      "dial_code": "+225",
      "code": "CI"
      },
      {
      "name": "Croatia",
      "dial_code": "+385",
      "code": "HR"
      },
      {
      "name": "Cuba",
      "dial_code": "+53",
      "code": "CU"
      },
      {
      "name": "Cyprus",
      "dial_code": "+357",
      "code": "CY"
      },
      {
      "name": "Czech Republic",
      "dial_code": "+420",
      "code": "CZ"
      },
      {
      "name": "Denmark",
      "dial_code": "+45",
      "code": "DK"
      },
      {
      "name": "Djibouti",
      "dial_code": "+253",
      "code": "DJ"
      },
      {
      "name": "Dominica",
      "dial_code": "+1 767",
      "code": "DM"
      },
      {
      "name": "Dominican Republic",
      "dial_code": "+1 849",
      "code": "DO"
      },
      {
      "name": "Ecuador",
      "dial_code": "+593",
      "code": "EC"
      },
      {
      "name": "Egypt",
      "dial_code": "+20",
      "code": "EG"
      },
      {
      "name": "El Salvador",
      "dial_code": "+503",
      "code": "SV"
      },
      {
      "name": "Equatorial Guinea",
      "dial_code": "+240",
      "code": "GQ"
      },
      {
      "name": "Eritrea",
      "dial_code": "+291",
      "code": "ER"
      },
      {
      "name": "Estonia",
      "dial_code": "+372",
      "code": "EE"
      },
      {
      "name": "Ethiopia",
      "dial_code": "+251",
      "code": "ET"
      },
      {
      "name": "Falkland",
      "dial_code": "+500",
      "code": "FK"
      },
      {
      "name": "Faroe Islands",
      "dial_code": "+298",
      "code": "FO"
      },
      {
      "name": "Fiji",
      "dial_code": "+679",
      "code": "FJ"
      },
      {
      "name": "Finland",
      "dial_code": "+358",
      "code": "FI"
      },
      {
      "name": "France",
      "dial_code": "+33",
      "code": "FR"
      },
      {
      "name": "French Guiana",
      "dial_code": "+594",
      "code": "GF"
      },
      {
      "name": "French Polynesia",
      "dial_code": "+689",
      "code": "PF"
      },
      {
      "name": "Gabon",
      "dial_code": "+241",
      "code": "GA"
      },
      {
      "name": "Gambia",
      "dial_code": "+220",
      "code": "GM"
      },
      {
      "name": "Georgia",
      "dial_code": "+995",
      "code": "GE"
      },
      {
      "name": "Germany",
      "dial_code": "+49",
      "code": "DE"
      },
      {
      "name": "Ghana",
      "dial_code": "+233",
      "code": "GH"
      },
      {
      "name": "Gibraltar",
      "dial_code": "+350",
      "code": "GI"
      },
      {
      "name": "Greece",
      "dial_code": "+30",
      "code": "GR"
      },
      {
      "name": "Greenland",
      "dial_code": "+299",
      "code": "GL"
      },
      {
      "name": "Grenada",
      "dial_code": "+1 473",
      "code": "GD"
      },
      {
      "name": "Guadeloupe",
      "dial_code": "+590",
      "code": "GP"
      },
      {
      "name": "Guam",
      "dial_code": "+1 671",
      "code": "GU"
      },
      {
      "name": "Guatemala",
      "dial_code": "+502",
      "code": "GT"
      },
      {
      "name": "Guernsey",
      "dial_code": "+44",
      "code": "GG"
      },
      {
      "name": "Guinea",
      "dial_code": "+224",
      "code": "GN"
      },
      {
      "name": "Guinea-Bissau",
      "dial_code": "+245",
      "code": "GW"
      },
      {
      "name": "Guyana",
      "dial_code": "+595",
      "code": "GY"
      },
      {
      "name": "Haiti",
      "dial_code": "+509",
      "code": "HT"
      },
      {
      "name": "Holy",
      "dial_code": "+379",
      "code": "VA"
      },
      {
      "name": "Honduras",
      "dial_code": "+504",
      "code": "HN"
      },
      {
      "name": "Hong Kong",
      "dial_code": "+852",
      "code": "HK"
      },
      {
      "name": "Hungary",
      "dial_code": "+36",
      "code": "HU"
      },
      {
      "name": "Iceland",
      "dial_code": "+354",
      "code": "IS"
      },
      {
      "name": "India",
      "dial_code": "+91",
      "code": "IN"
      },
      {
      "name": "Indonesia",
      "dial_code": "+62",
      "code": "ID"
      },
      {
      "name": "Iran",
      "dial_code": "+98",
      "code": "IR"
      },
      {
      "name": "Iraq",
      "dial_code": "+964",
      "code": "IQ"
      },
      {
      "name": "Ireland",
      "dial_code": "+353",
      "code": "IE"
      },
      {
      "name": "Isle of Man",
      "dial_code": "+44",
      "code": "IM"
      },
      {
      "name": "Israel",
      "dial_code": "+972",
      "code": "IL"
      },
      {
      "name": "Italy",
      "dial_code": "+39",
      "code": "IT"
      },
      {
      "name": "Jamaica",
      "dial_code": "+1 876",
      "code": "JM"
      },
      {
      "name": "Japan",
      "dial_code": "+81",
      "code": "JP"
      },
      {
      "name": "Jersey",
      "dial_code": "+44",
      "code": "JE"
      },
      {
      "name": "Jordan",
      "dial_code": "+962",
      "code": "JO"
      },
      {
      "name": "Kazakhstan",
      "dial_code": "+7 7",
      "code": "KZ"
      },
      {
      "name": "Kenya",
      "dial_code": "+254",
      "code": "KE"
      },
      {
      "name": "Kiribati",
      "dial_code": "+686",
      "code": "KI"
      },
      {
      "name": "Korea",
      "dial_code": "+850",
      "code": "KP"
      },
      {
      "name": "Korea, Republic of South Korea",
      "dial_code": "+82",
      "code": "KR"
      },
      {
      "name": "Kuwait",
      "dial_code": "+965",
      "code": "KW"
      },
      {
      "name": "Kyrgyzstan",
      "dial_code": "+996",
      "code": "KG"
      },
      {
      "name": "Laos",
      "dial_code": "+856",
      "code": "LA"
      },
      {
      "name": "Latvia",
      "dial_code": "+371",
      "code": "LV"
      },
      {
      "name": "Lebanon",
      "dial_code": "+961",
      "code": "LB"
      },
      {
      "name": "Lesotho",
      "dial_code": "+266",
      "code": "LS"
      },
      {
      "name": "Liberia",
      "dial_code": "+231",
      "code": "LR"
      },
      {
      "name": "Libyan Arab Jamahiriya",
      "dial_code": "+218",
      "code": "LY"
      },
      {
      "name": "Liechtenstein",
      "dial_code": "+423",
      "code": "LI"
      },
      {
      "name": "Lithuania",
      "dial_code": "+370",
      "code": "LT"
      },
      {
      "name": "Luxembourg",
      "dial_code": "+352",
      "code": "LU"
      },
      {
      "name": "Macao",
      "dial_code": "+853",
      "code": "MO"
      },
      {
      "name": "Macedonia",
      "dial_code": "+389",
      "code": "MK"
      },
      {
      "name": "Madagascar",
      "dial_code": "+261",
      "code": "MG"
      },
      {
      "name": "Malawi",
      "dial_code": "+265",
      "code": "MW"
      },
      {
      "name": "Malaysia",
      "dial_code": "+60",
      "code": "MY"
      },
      {
      "name": "Maldives",
      "dial_code": "+960",
      "code": "MV"
      },
      {
      "name": "Mali",
      "dial_code": "+223",
      "code": "ML"
      },
      {
      "name": "Malta",
      "dial_code": "+356",
      "code": "MT"
      },
      {
      "name": "Marshall Islands",
      "dial_code": "+692",
      "code": "MH"
      },
      {
      "name": "Martinique",
      "dial_code": "+596",
      "code": "MQ"
      },
      {
      "name": "Mauritania",
      "dial_code": "+222",
      "code": "MR"
      },
      {
      "name": "Mauritius",
      "dial_code": "+230",
      "code": "MU"
      },
      {
      "name": "Mayotte",
      "dial_code": "+262",
      "code": "YT"
      },
      {
      "name": "Mexico",
      "dial_code": "+52",
      "code": "MX"
      },
      {
      "name": "Micronesia",
      "dial_code": "+691",
      "code": "FM"
      },
      {
      "name": "Moldova",
      "dial_code": "+373",
      "code": "MD"
      },
      {
      "name": "Monaco",
      "dial_code": "+377",
      "code": "MC"
      },
      {
      "name": "Mongolia",
      "dial_code": "+976",
      "code": "MN"
      },
      {
      "name": "Montenegro",
      "dial_code": "+382",
      "code": "ME"
      },
      {
      "name": "Montserrat",
      "dial_code": "+1664",
      "code": "MS"
      },
      {
      "name": "Morocco",
      "dial_code": "+212",
      "code": "MA"
      },
      {
      "name": "Mozambique",
      "dial_code": "+258",
      "code": "MZ"
      },
      {
      "name": "Myanmar",
      "dial_code": "+95",
      "code": "MM"
      },
      {
      "name": "Namibia",
      "dial_code": "+264",
      "code": "NA"
      },
      {
      "name": "Nauru",
      "dial_code": "+674",
      "code": "NR"
      },
      {
      "name": "Nepal",
      "dial_code": "+977",
      "code": "NP"
      },
      {
      "name": "Netherlands",
      "dial_code": "+31",
      "code": "NL"
      },
      {
      "name": "Netherlands Antilles",
      "dial_code": "+599",
      "code": "AN"
      },
      {
      "name": "New Caledonia",
      "dial_code": "+687",
      "code": "NC"
      },
      {
      "name": "New Zealand",
      "dial_code": "+64",
      "code": "NZ"
      },
      {
      "name": "Nicaragua",
      "dial_code": "+505",
      "code": "NI"
      },
      {
      "name": "Niger",
      "dial_code": "+227",
      "code": "NE"
      },
      {
      "name": "Nigeria",
      "dial_code": "+234",
      "code": "NG"
      },
      {
      "name": "Niue",
      "dial_code": "+683",
      "code": "NU"
      },
      {
      "name": "Norfolk Island",
      "dial_code": "+672",
      "code": "NF"
      },
      {
      "name": "Northern Mariana Islands",
      "dial_code": "+1 670",
      "code": "MP"
      },
      {
      "name": "Norway",
      "dial_code": "+47",
      "code": "NO"
      },
      {
      "name": "Oman",
      "dial_code": "+968",
      "code": "OM"
      },
      {
      "name": "Pakistan",
      "dial_code": "+92",
      "code": "PK"
      },
      {
      "name": "Palau",
      "dial_code": "+680",
      "code": "PW"
      },
      {
      "name": "Palestinian",
      "dial_code": "+970",
      "code": "PS"
      },
      {
      "name": "Panama",
      "dial_code": "+507",
      "code": "PA"
      },
      {
      "name": "Papua New Guinea",
      "dial_code": "+675",
      "code": "PG"
      },
      {
      "name": "Paraguay",
      "dial_code": "+595",
      "code": "PY"
      },
      {
      "name": "Peru",
      "dial_code": "+51",
      "code": "PE"
      },
      {
      "name": "Philippines",
      "dial_code": "+63",
      "code": "PH"
      },
      {
      "name": "Pitcairn",
      "dial_code": "+872",
      "code": "PN"
      },
      {
      "name": "Poland",
      "dial_code": "+48",
      "code": "PL"
      },
      {
      "name": "Portugal",
      "dial_code": "+351",
      "code": "PT"
      },
      {
      "name": "Puerto Rico",
      "dial_code": "+1 939",
      "code": "PR"
      },
      {
      "name": "Qatar",
      "dial_code": "+974",
      "code": "QA"
      },
      {
      "name": "Romania",
      "dial_code": "+40",
      "code": "RO"
      },
      {
      "name": "Russia",
      "dial_code": "+7",
      "code": "RU"
      },
      {
      "name": "Rwanda",
      "dial_code": "+250",
      "code": "RW"
      },
      {
      "name": "Reunion",
      "dial_code": "+262",
      "code": "RE"
      },
      {
      "name": "Saint Barthelemy",
      "dial_code": "+590",
      "code": "BL"
      },
      {
      "name": "Saint Helena",
      "dial_code": "+290",
      "code": "SH"
      },
      {
      "name": "Saint Kitts and Nevis",
      "dial_code": "+1 869",
      "code": "KN"
      },
      {
      "name": "Saint Lucia",
      "dial_code": "+1 758",
      "code": "LC"
      },
      {
      "name": "Saint Martin",
      "dial_code": "+590",
      "code": "MF"
      },
      {
      "name": "Saint Pierre",
      "dial_code": "+508",
      "code": "PM"
      },
      {
      "name": "Saint Vincent",
      "dial_code": "+1 784",
      "code": "VC"
      },
      {
      "name": "Samoa",
      "dial_code": "+685",
      "code": "WS"
      },
      {
      "name": "San Marino",
      "dial_code": "+378",
      "code": "SM"
      },
      {
      "name": "Sao Tome and Principe",
      "dial_code": "+239",
      "code": "ST"
      },
      {
      "name": "Saudi Arabia",
      "dial_code": "+966",
      "code": "SA"
      },
      {
      "name": "Senegal",
      "dial_code": "+221",
      "code": "SN"
      },
      {
      "name": "Serbia",
      "dial_code": "+381",
      "code": "RS"
      },
      {
      "name": "Seychelles",
      "dial_code": "+248",
      "code": "SC"
      },
      {
      "name": "Sierra Leone",
      "dial_code": "+232",
      "code": "SL"
      },
      {
      "name": "Singapore",
      "dial_code": "+65",
      "code": "SG"
      },
      {
      "name": "Slovakia",
      "dial_code": "+421",
      "code": "SK"
      },
      {
      "name": "Slovenia",
      "dial_code": "+386",
      "code": "SI"
      },
      {
      "name": "Solomon Islands",
      "dial_code": "+677",
      "code": "SB"
      },
      {
      "name": "Somalia",
      "dial_code": "+252",
      "code": "SO"
      },
      {
      "name": "South Africa",
      "dial_code": "+27",
      "code": "ZA"
      },
      {
      "name": "South Georgia",
      "dial_code": "+500",
      "code": "GS"
      },
      {
      "name": "Spain",
      "dial_code": "+34",
      "code": "ES"
      },
      {
      "name": "Sri Lanka",
      "dial_code": "+94",
      "code": "LK"
      },
      {
      "name": "Sudan",
      "dial_code": "+249",
      "code": "SD"
      },
      {
      "name": "Suriname",
      "dial_code": "+597",
      "code": "SR"
      },
      {
      "name": "Svalbard and Jan",
      "dial_code": "+47",
      "code": "SJ"
      },
      {
      "name": "Swaziland",
      "dial_code": "+268",
      "code": "SZ"
      },
      {
      "name": "Sweden",
      "dial_code": "+46",
      "code": "SE"
      },
      {
      "name": "Switzerland",
      "dial_code": "+41",
      "code": "CH"
      },
      {
      "name": "Syrian Arab Republic",
      "dial_code": "+963",
      "code": "SY"
      },
      {
      "name": "Taiwan",
      "dial_code": "+886",
      "code": "TW"
      },
      {
      "name": "Tajikistan",
      "dial_code": "+992",
      "code": "TJ"
      },
      {
      "name": "Tanzania",
      "dial_code": "+255",
      "code": "TZ"
      },
      {
      "name": "Thailand",
      "dial_code": "+66",
      "code": "TH"
      },
      {
      "name": "Timor-Leste",
      "dial_code": "+670",
      "code": "TL"
      },
      {
      "name": "Togo",
      "dial_code": "+228",
      "code": "TG"
      },
      {
      "name": "Tokelau",
      "dial_code": "+690",
      "code": "TK"
      },
      {
      "name": "Tonga",
      "dial_code": "+676",
      "code": "TO"
      },
      {
      "name": "Trinidad and Tobago",
      "dial_code": "+1 868",
      "code": "TT"
      },
      {
      "name": "Tunisia",
      "dial_code": "+216",
      "code": "TN"
      },
      {
      "name": "Turkey",
      "dial_code": "+90",
      "code": "TR"
      },
      {
      "name": "Turkmenistan",
      "dial_code": "+993",
      "code": "TM"
      },
      {
      "name": "Turks and Caicos",
      "dial_code": "+1 649",
      "code": "TC"
      },
      {
      "name": "Tuvalu",
      "dial_code": "+688",
      "code": "TV"
      },
      {
      "name": "Uganda",
      "dial_code": "+256",
      "code": "UG"
      },
      {
      "name": "Ukraine",
      "dial_code": "+380",
      "code": "UA"
      },
      {
      "name": "United Arab Emirates",
      "dial_code": "+971",
      "code": "AE"
      },
      {
      "name": "United Kingdom",
      "dial_code": "+44",
      "code": "GB"
      },
      {
      "name": "United States",
      "dial_code": "+1",
      "code": "US"
      },
      {
      "name": "Uruguay",
      "dial_code": "+598",
      "code": "UY"
      },
      {
      "name": "Uzbekistan",
      "dial_code": "+998",
      "code": "UZ"
      },
      {
      "name": "Vanuatu",
      "dial_code": "+678",
      "code": "VU"
      },
      {
      "name": "Venezuela",
      "dial_code": "+58",
      "code": "VE"
      },
      {
      "name": "Vietnam",
      "dial_code": "+84",
      "code": "VN"
      },
      {
      "name": "Virgin Islands, British",
      "dial_code": "+1 284",
      "code": "VG"
      },
      {
      "name": "Virgin Islands, U.S.",
      "dial_code": "+1 340",
      "code": "VI"
      },
      {
      "name": "Wallis and Futuna",
      "dial_code": "+681",
      "code": "WF"
      },
      {
      "name": "Yemen",
      "dial_code": "+967",
      "code": "YE"
      },
      {
      "name": "Zambia",
      "dial_code": "+260",
      "code": "ZM"
      },
      {
      "name": "Zimbabwe",
      "dial_code": "+263",
      "code": "ZW"
      }
      ]
  }

  pagination(event){
    this.pageNumber = event
    this.getViewData()
  }

  getViewData(){

    let apireq={        
      "limit" : 10,  
      "pageNumber" : this.pageNumber,
      "search" : ""
    }

    this.spinner.show();
    this.service.postApi('/api/v1/admin/getDeliverPersion',apireq,1).subscribe((success:any)=>{
      if(success.response_code==200){
        this.spinner.hide();
        this.userArr = success.Data.docs;
        this.limit = success.Data.limit;
        this.total = success.Data.total;
        this.srNumber = (this.pageNumber - 1) * 10;
        this.totalItems = success.Data;
      }
      else{
        this.spinner.hide();
        this.service.err("Something went wrong")
      }
    },error=>{
      this.spinner.hide();
      this.service.err("Something went wrong")
    })
  }
  Changed(event){
    if (event) {
      this.nowDate2 = event;
    }
    else{
      this.nowDate2 = ''
    }
  }

  fromMaxDate(event) {
    if (event) {
      this.todayDate = new Date(event)
    } else {
      this.todayDate = new Date()
    }
  }

  sendNotification(id){
    this.id=id;
  }

  sendNotification1(data) {

    if (this.sendNotificationForm.invalid) {
      return
    }
    $('#sendNotification').modal('hide')
   
    let apireq = {
      userId:this.id,
      title: data.title,
      message: data.message,
      adminId:localStorage.getItem('_id')
    }

    this.spinner.show();
    this.service.postApi('/api/v1/admin/sendMessageToUser', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.sendNotificationForm.reset();
      } else {
        this.spinner.hide()
        this.service.err("Something went wrong");
      }
    },error=>{
      this.spinner.hide()
      this.service.err("Something went wrong")
    })
  }




  sendNotificationToAll1(data) {

    if (this.sendNotificationToAllForm.invalid) {
      return
    }
    $('#sendNotificationToAll').modal('hide')

    let apireq = {
      title: data.title,
      message: data.message,
      adminId: localStorage.getItem('_id')
    }

    this.spinner.show();
    this.service.postApi('/api/v1/admin/sendNotificationToAll', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.sendNotificationToAllForm.reset();
      } else {
        this.spinner.hide();
        this.service.err("Something went wrong");
      }
    }, error => {
      this.spinner.hide();
      this.service.err("Something went wrong")
    })
  }

  reset() {
    this.sendNotificationForm.controls['title'].setValue(null)
    this.sendNotificationForm.controls['message'].setValue(null)
    this.mailForm.controls['message'].setValue(null)
  
  }

  reset1() {
    this.sendNotificationToAllForm.controls['title'].setValue(null)
    this.sendNotificationToAllForm.controls['message'].setValue(null)
  
  }


  

  search(data){

    let apireq={        
      "limit" : 10,  
      "pageNumber" : this.pageNumber,
      "search" : data.search,
      "startDate": (data.startDate == '' || data.startDate == undefined) ? '' : (new Date(data.startDate).toISOString()),
      "endDate": (data.endDate == '' || data.endDate == undefined) ? '' : (new Date(new Date(data.endDate).getTime() + 24 * 60 * 60 * 1000).toISOString()),
    }
  
    this.service.postApi('/api/v1/admin/getDeliverPersion',apireq,1).subscribe((success:any)=>{
    
      if(success.response_code==200){
        this.userArr = success.Data.docs;
        this.limit = success.Data.limit;
        this.total = success.Data.total;
        this.totalItems = success.Data;
      
      }
      else{
        this.service.err("Something went wrong")
      }
    },error=>{
      this.service.err("Something went wrong")
    })
  }

  delete(id) {
    this.id = id;
  }

  deleteApi() {

    let deleteData = {
      "userId" : this.id,
      adminId:localStorage.getItem('_id')
    }

    this.spinner.show();
    this.service.postApi("/api/v1/admin/deleteUser", deleteData, 0).subscribe((data:any) => {
      if(data.response_code == 200) {
        this.spinner.hide();
        this.getViewData()
        this.service.succ(data.response_message);
  
      } else {
        this.spinner.hide();
        this.service.err("Something went wrong")
      }
  
    });
  }

  blockApi(status,modal){

    let apireq={
      "userId":this.userId,
      "status":status,
      adminId:localStorage.getItem('_id')
    }

    this.spinner.show();
    this.service.postApi('/api/v1/admin/updateUserStatus',apireq,1).subscribe((success:any)=>{
      if(success.response_code==200){
        this.spinner.hide();
        this.getViewData()
        $('#'+modal).modal('hide')
        this.service.succ(success.response_message)
      }
      else{
        this.spinner.hide();
        this.service.err("Something went wrong")
      }
    },error=>{
      this.spinner.hide();
      this.service.err("Something went wrong")
    })
  }

  rejectApi(status, modal) {

    let apireq = {
      "userId": this.userId,
      "certificateVerify": status,
      "signupWithDeliveryPerson":"true",
      adminId:localStorage.getItem('_id')
    }

    this.spinner.show();
    this.service.postApi('/api/v1/admin/updateCertificateStatus', apireq, 1).subscribe((success: any) => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.getViewData()
        $('#' + modal).modal('hide')
        this.service.succ(success.response_message)
      }
      else {
        this.spinner.hide();
        this.service.err("Something went wrong")
      }
    }, error => {
      this.spinner.hide();
      this.service.err("Something went wrong")
    })
  }
  
  openModal(id,userId){
    this.userId=userId
    $('#'+id).modal({ backdrop: 'static', keyboard: false });
  }

  changeDate(){
    this.dateValue=new Date(this.searchForm.value.formDate)

  }

  cancelModal() {
    this.formvalidation.submitted = false
    this.addUserForm.reset()
    this.activeImage=''
    this.fileUploader.nativeElement.value = null;
    this.mailForm.reset()
    this.addUserForm.controls['gender'].setValue('')
    this.addUserForm.controls['speakLanguage'].setValue('')
    this.addUserForm.controls['appLanguage'].setValue('')
    this.addUserForm.controls['country'].setValue('')
    this.addUserForm.controls['countryCode'].setValue('')
    this.addUserForm.controls['vehicleType'].setValue('')
    this.flag=0
  }

  addUser() {
    $('#addUser').modal({ backdrop: 'static', keyboard: false });
  }

  selectImages(event) {
    var urls = [];
    var file = event.target.files;
    if (file) {
      for (let files of file) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          urls.push(e.target.result);
          var urlsLength = urls.length
          if (urlsLength == file.length) {
            this.activeImage = urls[0]
            this.flag = 2
          }
        }
        reader.readAsDataURL(files);
      }
      const formData = new FormData();
      this.fileLength = file.length
      for (let i = 0; i < file.length; i++) {
        this.formdata.append('file', file[i], file[i].name);
      }
    }
    
  }

  addUser1() {
    
    this.spinner.show();
    this.formvalidation.submitted = true
    if (this.activeImage == '') {
      this.flag = 1
      return
    }
    else {
      this.flag = 2
    }
    if (this.addUserForm.invalid) {
      this.spinner.hide();
      return
    }
    this.buttonDisable = 1
    this.formdata.append("name", this.addUserForm.value.name)
    this.formdata.append("country", this.addUserForm.value.country)
    this.formdata.append("email", this.addUserForm.value.email)
    this.formdata.append("mobileNumber", this.addUserForm.value.mobileNumber)
    this.formdata.append("gender", this.addUserForm.value.gender)
    this.formdata.append("dob", this.addUserForm.value.dob)
    this.formdata.append("speakLanguage", this.addUserForm.value.speakLanguage)
    this.formdata.append("appLanguage", this.addUserForm.value.appLanguage)
    this.formdata.append("deliveryPAboutUs", this.addUserForm.value.deliveryPAboutUs)
    this.formdata.append("vehicleType", this.addUserForm.value.vehicleType)
    this.formdata.append("vehicleNumber", this.addUserForm.value.vehicleNumber)
    this.formdata.append("insuranceNumber", this.addUserForm.value.insuranceNumber)
    this.formdata.append("countryCode", this.addUserForm.value.countryCode)
    this.formdata.append("deliveryPEmergencyContact", this.addUserForm.value.deliveryPEmergencyContact)
    this.formdata.append("adminId", localStorage.getItem("_id"))
    this.service.formdataApi("/api/v1/admin/deliveryPerson", this.formdata).subscribe(success => {
 
      if (success.body.response_code == 200) {
        this.service.succ(success.body.response_message);
        this.formdata.delete('file');
        this.activeImage = ''
        this.formdata.delete('_id')
        this.formdata.delete("name")
        this.formdata.delete("country")
        this.formdata.delete("email")
        this.formdata.delete("mobileNumber")
        this.formdata.delete("adminId")
        this.formdata.delete("gender")
        this.formdata.delete("dob")
        this.formdata.delete("speakLanguage")
        this.formdata.delete("appLanguage")
        this.formdata.delete("deliveryPAboutUs")
        this.formdata.delete("vehicleType")
        this.formdata.delete("vehicleNumber")
        this.formdata.delete("insuranceNumber")
        this.formdata.delete("deliveryPEmergencyContact")
        this.formdata.delete("countryCode")
        this.buttonDisable = 2
        $("#addUser").modal('hide')
        this.router.navigate(['/admin/deliverPersionManagement/']);
        this.addUserForm.reset();
        this.getViewData()
        this.formvalidation.submitted = false
        this.spinner.hide();
      }
      else {
        this.buttonDisable = 2
        this.activeImage = ''
        this.formdata.delete('file');
        this.formdata.delete('_id')
        this.formdata.delete("country")
        this.formdata.delete("name")
        this.formdata.delete("email")
        this.formdata.delete("mobileNumber")
        this.formdata.delete("gender")
        this.formdata.delete("dob")
        this.formdata.delete("speakLanguage")
        this.formdata.delete("appLanguage")
        this.formdata.delete("deliveryPAboutUs")
        this.formdata.delete("vehicleType")
        this.formdata.delete("vehicleNumber")
        this.formdata.delete("insuranceNumber")
        this.formdata.delete("deliveryPEmergencyContact")
        this.formdata.delete("countryCode")
        this.spinner.hide();
        
      }
    }, error => {
      this.buttonDisable = 2
      this.activeImage = ''
      this.formdata.delete('file');
      this.formdata.delete('_id')
      this.formdata.delete("country")
      this.formdata.delete("name")
      this.formdata.delete("email")
      this.formdata.delete("mobileNumber")
      this.formdata.delete("gender")
      this.formdata.delete("dob")
      this.formdata.delete("speakLanguage")
      this.formdata.delete("appLanguage")
      this.formdata.delete("deliveryPAboutUs")
      this.formdata.delete("vehicleType")
      this.formdata.delete("vehicleNumber")
      this.formdata.delete("insuranceNumber")
      this.formdata.delete("deliveryPEmergencyContact")
      this.formdata.delete("countryCode")
      this.service.error("Something went wrong")
      this.spinner.hide();
    })
  }


  edit_user_modal(x){

    this.id=x._id,
    this.name=x.name,
    this.email=x.email,
    this.gender=x.gender,
    this.appLanguage=x.appLanguage,
    this.speakLanguage=x.speakLanguage,
    this.dob=x.dob,
    this.country=x.country,
    this.deliveryPAboutUs=x.deliveryPAboutUs,
    this.vehicleType=x.vehicleType,
    this.vehicleNumber=x.vehicleNumber,
    this.insuranceNumber=x.insuranceNumber,
    this.deliveryPEmergencyContact=x.deliveryPEmergencyContact,
    this.minimumOfferLimitDelivery=x.minimumOfferLimitDelivery,
    this.orderForDeliveryDistance=x.orderForDeliveryDistance
  
    this.editUserForm.patchValue({
      name: x.name,
      email: x.email,
      gender: x.gender,
      appLanguage:x.appLanguage,
      speakLanguage:x.speakLanguage,
      dob: x.dob,
      country: x.country,
      deliveryPAboutUs:x.deliveryPAboutUs,
      vehicleType:x.vehicleType,
      vehicleNumber:x.vehicleNumber,
      insuranceNumber:x.insuranceNumber,
      deliveryPEmergencyContact:x.deliveryPEmergencyContact,
      minimumOfferLimitDelivery:x.minimumOfferLimitDelivery,
      orderForDeliveryDistance:x.orderForDeliveryDistance,

    });

  }


  editUser1(data) {
  
    this.spinner.show();
    if (this.editUserForm.invalid) {
      this.spinner.hide();
      return
    }
    $('#edit_user_modal').modal('hide')
   
    let apireq = {
      name: data.name,
      email: data.email,
      gender: data.gender,
      appLanguage:data.appLanguage,
      speakLanguage:data.speakLanguage,
      dob: data.dob,
      country: data.country,
      deliveryPAboutUs:data.deliveryPAboutUs,
      vehicleType:data.vehicleType,
      vehicleNumber:data.vehicleNumber,
      insuranceNumber:data.insuranceNumber,
      deliveryPEmergencyContact:data.deliveryPEmergencyContact,
      minimumOfferLimitDelivery:data.minimumOfferLimitDelivery,
      orderForDeliveryDistance:data.orderForDeliveryDistance,
      userId: this.id,
      adminId:localStorage.getItem('_id')
    }

    this.service.postApi('/api/v1/admin/updateUserDetails', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.service.succ(success.response_message);
        $("#edit_user_modal").modal('hide')
        this.router.navigate(['../../admin/deliverPersionManagement/']);
        this.getViewData()
      } else {
        this.spinner.hide();
        this.service.err("Something went wrong");
      }
    }, error => {
      this.spinner.hide();
        this.service.err("Something went wrong");
    })
  }

  mail(id){
    console.log("id is",id)
    this.id=id;
  }

  sendMail(data) {

    if (this.mailForm.invalid) {
      return
    }
    $('#mail').modal('hide')
   
    let apireq = {

      userId:this.id,
      message: data.message,
      adminId:localStorage.getItem("_id")
    }

    this.spinner.show();
    this.service.postApi('/api/v1/admin/sendMail', apireq, 0).subscribe(success => {
      if (success.response_code == 200) {
        this.spinner.hide();
        this.service.succ(success.response_message);
        this.mailForm.reset();
      } else {
        this.spinner.hide();
        this.service.err("Something went wrong");
      }
    },error=>{
      this.spinner.hide();
      this.service.err("Something went wrong")
    })
  }




}
