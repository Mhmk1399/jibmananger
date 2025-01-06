import React, { useState } from 'react';
import bankmeli from '@/public/images/kisspng-bank-melli-iran-mobile-banking-bank-maskan-financi-5b046999eee5f8.5371391515270158339785.png'
import banksepah from '@/public/images/kisspng-bank-sepah-mobile-banking-deposit-account-iranian-sepah-5b0fcba1557738.5382741215277618253501.png'
import post from '@/public/images/postbank.webp'
import tose from '@/public/images/tosee.png'
import sanat from '@/public/images/sanatmadn.png'
import eghtesad from '@/public/images/EnbankNewLog-100x18.png'
import parsian from '@/public/images/bank-parsian-logo-512.png'
import pasargad from '@/public/images/Bank_Pasargad_logo.png'
import karafarin from '@/public/images/Karafarin_Bank.png'
import saman from '@/public/images/Saman bank logo Vector.png'
import tejarat from '@/public/images/1398708899_tejarat-mobile-bank-logo.png'
import maskan from '@/public/images/kisspng-bank-maskan-bank-mellat-mobile-banking-maskan-bank-5b1f42e1f2ee91.6989961015287753939951.png'
import sarmayeh from '@/public/images/Sarmayeh_Bank_Logo.png'
import sina from '@/public/images/bank sina.jpg'
import melat from '@/public/images/Bank_Mellat_Logo.svg'
import iranzamin from '@/public/images/Iranzamin-logo.svg'
import ayande from '@/public/images/Ayandeh_Bank_Logo.svg'
import saderat from '@/public/images/kisspng-bank-saderat-iran-banking-and-insurance-in-iran-ce-iran-5ac214cec60a29.5125036015226687508112.png'
import refah from '@/public/images/Refah-Bank-Logo-1.png'
import ansar from '@/public/images/ansar-logo.png'
import dey from '@/public/images/Daybank.png'
import keshavarzi from '@/public/images/keshavarzi.png'
import mehr from '@/public/images/mehr-bank-logo-512.png'
import gavamin from '@/public/images/Ghavamin_logo.svg.png'
import shahr from '@/public/images/shahr-bank-logo-512.png'
import gardesh from '@/public/images/gardeshgari-bank-logo-512.png'
import Image from 'next/image';

const BANK_INFO = {
  '603799': { name: 'بانک ملی ایران', value: 'meli', color: '#008752', logo: bankmeli.src },
  '589210': { name: 'بانک سپه', value: 'sepah', color: '#0066FF', logo: banksepah.src },
  '627412': { name: 'بانک اقتصاد نوین', value: 'eghtesad', color: '#b42234', logo: eghtesad.src },
  '207177': { name: 'بانک توسعه صادرات ایران', value: 'saderat', color: '#233861', logo: saderat.src },
  '627381': { name: 'بانک انصار', value: 'ansar', color: '#007749', logo: ansar.src },
  '502229': { name: 'بانک پاسارگاد', value: 'pasargad', color: '#8c198b', logo: pasargad.src },
  '505785': { name: 'بانک ایران زمین', value: 'iranzamin', color: '#007749', logo: iranzamin.src },
  '502806': { name: 'بانک شهر', value: 'shahr', color: '#004B8D', logo: shahr.src },
  '622106': { name: 'بانک پارسیان', value: 'parsian', color: '#8c198b', logo: parsian.src },
  '639194': { name: 'بانک پارسیان', value: 'parsian', color: '#8c198b', logo: parsian.src },
  '627884': { name: 'بانک پارسیان', value: 'parsian', color: '#8c198b', logo: parsian.src },
  '502908': { name: 'بانک توسعه تعاون', value: 'tosee', color: '#8c198b', logo: tose.src },
  '502910': { name: 'بانک کارآفرین', value: 'karafarin', color: '#8c198b', logo: karafarin.src },
  '502938': { name: 'بانک دی', value: 'dey', color: '#004B8D', logo: dey.src },
  '639347': { name: 'بانک پاسارگاد', value: 'pasargad', color: '#8c198b', logo: pasargad.src },
  '505416': { name: 'بانک گردشگری', value: 'gardeshgari', color: '#004B8D', logo: gardesh.src },
  '636214': { name: 'بانک تات', value: 'ayandeh', color: '#0066A4', logo: ayande.src },
  '627353': { name: 'بانک تجارت', value: 'tejarat', color: '#2F4F9E', logo: tejarat.src },
  '589463': { name: 'بانک رفاه کارگران', value: 'refah', color: '#E5970D', logo: refah.src },
  '627648': { name: 'بانک توسعه صادرات ایران', value: 'saderat', color: '#233861', logo: saderat.src },
  '603769': { name: 'بانک صادرات ایران', value: 'saderat', color: '#0c1d63', logo: saderat.src },
  '603770': { name: 'بانک کشاورزی', value: 'keshavarzi', color: '#004B8D', logo: keshavarzi.src },
  '606373': { name: 'بانک قرض الحسنه مهر ایران', value: 'mehr', color: '#004B8D', logo: mehr.src },
  '621986': { name: 'بانک سامان', value: 'saman', color: '#8c198b', logo: saman.src },
  '639607': { name: 'بانک سرمایه', value: 'sarmayeh', color: '#004B8D', logo: sarmayeh.src },
  '639346': { name: 'بانک سینا', value: 'sina', color: '#8c198b', logo: sina.src },
  '627961': { name: 'بانک صنعت و معدن', value: 'sanat', color: '#233861', logo: sanat.src },
  '639599': { name: 'بانک قوامین', value: 'ghavamin', color: '#004B8D', logo: gavamin.src },
  '627488': { name: 'بانک کارآفرین', value: 'karafarin', color: '#8c198b', logo: karafarin.src },
  '639217': { name: 'بانک کشاورزی', value: 'keshavarzi', color: '#004B8D', logo: keshavarzi.src },
  '628023': { name: 'بانک مسکن', value: 'maskan', color: '#e84511', logo: maskan.src },
  '991975': { name: 'بانک ملت', value: 'mellat', color: '#DD0033', logo: melat.src },
  '610433': { name: 'بانک ملت', value: 'mellat', color: '#DD0033', logo: melat.src },
  '639370': { name: 'بانک مهر اقتصاد', value: 'mehr', color: '#004B8D', logo: mehr.src },
  '627760': { name: 'پست بانک ایران', value: 'post', color: '#046904', logo: post.src },
};
const CardInput = ({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
  });

  const [detectedBank, setDetectedBank] = useState<{ name: string; color: string; logo: string } | null>(null);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
    setFormData(prev => ({ ...prev, cardNumber: value }));
    console.log(formData)

    const cleanNumber = value.replace(/\s/g, '');
    if (cleanNumber.length >= 6) {
      const prefix = cleanNumber.substring(0, 6);
      const bank = BANK_INFO[prefix as keyof typeof BANK_INFO];
      setDetectedBank(bank || null);
    } else {
      setDetectedBank(null);
    }
  };

  return (
    <div>
       <input
                type="text"
                name="cardNumber"
                placeholder="شماره کارت"
                value={value}
                onChange={(e) => { onChange(e); handleCardNumberChange(e); }}
                maxLength={19}
                dir='ltr'
                className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              {detectedBank && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <span className="text-sm font-medium w-8">
                    <Image
                      src={detectedBank.logo}
                      alt={detectedBank.name}
                      className="w-6 h-6"
                      width={24}
                      height={24}
                    />
                  </span>
                </div>
              )}
    </div>
  );
};

export default CardInput;