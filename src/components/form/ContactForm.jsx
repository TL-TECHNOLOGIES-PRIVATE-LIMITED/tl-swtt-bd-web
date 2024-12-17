import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FaFacebookF, FaInstagram, FaLinkedin, FaPinterest, FaWhatsapp, FaYoutube, FaGlobeAmericas, FaAsterisk, FaMapPin } from 'react-icons/fa';
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { SiGooglemybusiness } from 'react-icons/si';
import SocialMediaIcons from '../icons/SocialMediaIcons';
import TooltipButton from '../tooltip/ToolTipButton';
import { format, startOfToday } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import mapIcon from '../../assets/mapIcon.svg';
import CustomAlert from '../alert/CustomAlert';
import CountrySelector from './CountrySelector';

const servicesOptions = [
  "Job Placement Assistance",
  "Airline Ticket Booking",
  "Visa Processing Services",
  "Tour Packages",
  "Travel Insurance",
  "Accommodation Arrangements",
  "24/7 Travel Support",
  "Transportation Services"
];

const visaServiceOptions = {
  'Visiting Visa': [
    { value: 'uae-visiting', label: 'UAE' },
    { value: 'saudi-visiting', label: 'Saudi Arabia' },
    { value: 'oman-visiting', label: 'Oman' },
    { value: 'kuwait-visiting', label: 'Kuwait' }
  ],
  'Global Visa Services': [
    { value: 'uk-global', label: 'UK' },
    { value: 'usa-global', label: 'USA' },
    { value: 'schengen-global', label: 'Schengen' },
    { value: 'canada-global', label: 'Canada' },
    { value: 'australia-global', label: 'Australia' },
    { value: 'russia-global', label: 'Russia' },
    { value: 'malaysia-global', label: 'Malaysia' },
    { value: 'singapore-global', label: 'Singapore' },
    { value: 'egypt-global', label: 'Egypt' },
    { value: 'sri-lanka-global', label: 'Sri Lanka' },
    { value: 'turkey-global', label: 'Turkey' },
    { value: 'armenia-global', label: 'Armenia' },
    { value: 'azerbaijan-global', label: 'Azerbaijan' }
  ],
  'Job Only': [
    { value: 'uae-job', label: 'UAE' }
  ]
};
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must not exceed 50 characters'),

  email: yup
    .string()
    .optional()
    .email('Email is not valid'),

  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Phone number is not valid'),

 

  highestEducation: yup
    .string()
    .optional(),

  typeOfTravel: yup
    .string()
    .optional(),

  preferredServices: yup.array().min(1, 'At least one service must be selected').required('Services are required'),

  message: yup.string().optional(),
  visaServiceType: yup.string().when('preferredServices', {
    is: (services) => services && services.includes('Visa Processing Services'),
    then: () => yup.string().required('Please select a visa service type'),
    otherwise: () => yup.string().optional()
  }),
  
  visaService: yup.string().when(['preferredServices', 'visaServiceType'], {
    is: (services, visaServiceType) => 
      services && services.includes('Visa Processing Services') && visaServiceType,
    then: () => yup.string().required('Please select a specific visa service'),
    otherwise: () => yup.string().optional()
  })
});

const ContactForm = () => {
  const { register, control, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: yupResolver(schema)
  });

  const [phone, setPhone] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedVisaServiceType, setSelectedVisaServiceType] = useState('');
  const [selectedVisaService, setSelectedVisaService] = useState('');

  const message = watch('message', '');
  const preferredServices = watch('preferredServices');

  const handleServiceChange = (event) => {
    const value = event.target.value;
    let updatedServices;

    if (value) {
      if (selectedServices.includes(value)) {
        updatedServices = selectedServices.filter(service => service !== value);
      } else {
        updatedServices = [...selectedServices, value];
      }
    } else {
      updatedServices = [];
    }

    setSelectedServices(updatedServices);
    setValue('preferredServices', updatedServices);

    // Reset visa service selections if Visa Processing Services is not selected
    if (!updatedServices.includes('Visa Processing Services')) {
      setSelectedVisaServiceType('');
      setSelectedVisaService('');
      setValue('visaServiceType', '');
      setValue('visaService', '');
    }
  };

  const removeService = (service) => {
    setSelectedServices(selectedServices.filter(item => item !== service));
  };

  const onSubmit = (data) => {
    setShowAlert(true);
  
    const submissionData = { ...data };
  
    if (selectedServices.includes('Visa Processing Services')) {
      submissionData.visaServiceType = selectedVisaServiceType;
      submissionData.visaService = selectedVisaService;
    }
  
    const visaServiceLabels = {
      'uae-visiting': 'UAE Visiting Visa',
      'saudi-visiting': 'Saudi Arabia Visiting Visa',
      'oman-visiting': 'Oman Visiting Visa',
      'kuwait-visiting': 'Kuwait Visiting Visa',
      'uk-global': 'UK Global Visa',
      'usa-global': 'USA Global Visa',
      'schengen-global': 'Schengen Global Visa',
      'canada-global': 'Canada Global Visa',
      'australia-global': 'Australia Global Visa',
      'russia-global': 'Russia Global Visa',
      'malaysia-global': 'Malaysia Global Visa',
      'singapore-global': 'Singapore Global Visa',
      'egypt-global': 'Egypt Global Visa',
      'sri-lanka-global': 'Sri Lanka Global Visa',
      'turkey-global': 'Turkey Global Visa',
      'armenia-global': 'Armenia Global Visa',
      'azerbaijan-global': 'Azerbaijan Global Visa',
      'uae-job': 'UAE Job Visa'
    };
  
    const whatsappMessage =
      `🌟 *Enquiry* 🌟\n\n` +
      `👤 *Name :* ${data.name}\n` +
      `📞 *Email :* ${data.email || 'Nil'}\n` +
      `📞 *Phone :* +${phone}\n` +
      // `🌍 *Country :* ${data.country}\n` +
      `🎓 *Highest Education :* ${data.highestEducation || 'Nil'}\n` +
      `✈️ *Type of Travel :* ${data.typeOfTravel || 'Nil'}\n` +
      `🔧 *Preferred Services :* ${data.preferredServices.join(', ') || 'No services selected'}\n` +
      // Add Visa Service details if selected
      (selectedServices.includes('Visa Processing Services') 
        ? `✈️ *Visa Service Type :* ${selectedVisaServiceType}\n` +
          `✈️ *Specific Visa Service :* ${visaServiceLabels[selectedVisaService] || selectedVisaService}\n` 
        : '') +
      `📝 *Message :* ${data.message || 'No additional message'}\n\n` +
      `Want to know more? Visit: https://skyworld.go-bd.com`;
  
    const url = `https://api.whatsapp.com/send?phone=919446004261&text=${encodeURIComponent(whatsappMessage)}`;
  
    setTimeout(() => {
      setShowAlert(false);
      window.open(url, '_blank');
    }, 2000);
  };

  const today = format(startOfToday(), 'yyyy-MM-dd');
  return (
    <div className="custom-scrollbar p-4 w-full h-full backdrop-blur-xl text-xs overflow-y-auto text-black bg-white">
      {showAlert && <CustomAlert />}
      <form onSubmit={handleSubmit(onSubmit)} className="md:space-y-2 space-y-3 max-w-lg mx-auto flex flex-col justify-between h-full w-full">
        <h1 className='text-3xl font-bold space-y-2'>Know More About Us !</h1>
        <p className='md:text-sm text-[10px] text-black flex items-center'>Please fill out all required fields (<FaAsterisk className='text-red-500 text-[7px]' />) to ensure a smooth process.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="gap-1 text-xs flex items-center font-bold text-gray-700 ps-2">
              <FaAsterisk className='text-red-500 text-sm pe-2' /><span className='font-extrabold '>Name</span>
              <TooltipButton content={<p>Enter your full name as it appears on official documents.</p>} />
            </label>
            <input
              {...register('name')}
              placeholder='Enter your full name'
              className="mt-1 block w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
            {errors.name && <p className='text-red-500 ps-4 text-[10px]'>{errors.name.message}</p>}
          </div>
          <div>
            <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-2">
              <FaAsterisk className='text-white text-sm pe-2' /><span className='font-extrabold '>Email</span>
              <TooltipButton content={<p>Provide your email address.</p>} />
            </label>
            <input
              {...register('email')}
              placeholder='Enter your email'
              className="mt-1 block w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <p className='text-red-500 ps-4 text-[10px]'>{errors.email.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-2">
              <FaAsterisk className='text-red-500 text-sm pe-2' /><span className='font-extrabold '>Phone Number</span>
              <TooltipButton content={<p>Provide your contact number including country code.</p>} />
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  country={'in'}
                  value={phone}
                  onChange={(phone) => {
                    setPhone(phone);
                    field.onChange(phone);
                  }}
                  inputProps={{
                    name: 'phone',
                    required: true,
                    // autoFocus: true
                  }}
                  containerStyle={{ width: '100%', marginTop: '4px' }}
                  inputStyle={{ width: '100%', borderRadius: '9999px', fontFamily: '"Outfit", sans-serif', fontSize: "12px" }}
                />
              )}
            />
            {errors.phoneNumber && <p className='text-red-500 ps-4 text-[10px]'>{errors.phoneNumber.message}</p>}
          </div>
          {/* <div>
            <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-2">
              <FaAsterisk className='text-red-500 text-sm pe-2' /><span className='font-extrabold '>Country</span>
              <TooltipButton content={<p>Select your country.</p>} />
            </label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <CountrySelector
                  {...field}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
            {errors.country && <p className='text-red-500 ps-4 text-[10px]'>{errors.country.message}</p>}
          </div> */}
          <div>
            <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-2">
              <FaAsterisk className='text-white text-sm pe-2' />
              <span className='font-extrabold '>Highest Education</span>
              <TooltipButton content={<p>Select your highest level of education.</p>} />
            </label>
            <select {...register('highestEducation')} className="mt-1 block w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select your highest education</option>
              <option value="highschool">High School</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD</option>
            </select>
            {errors.highestEducation && <p className='text-red-500 ps-4 text-[10px]'>{errors.highestEducation.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          
          <div>
            <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-2">
              <FaAsterisk className='text-white text-sm pe-2' />
              <span className='font-extrabold '>Type of Travel</span>
              <TooltipButton content={<p>Select your type of travel.</p>} />
            </label>
            <select {...register('typeOfTravel')} className="mt-1 block w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select type of travel</option>
              <option value="leisure">Leisure</option>
              <option value="business">Business</option>
              <option value="adventure">Adventure</option>
            </select>
            {errors.typeOfTravel && <p className='text-red-500 ps-4 text-[10px]'>{errors.typeOfTravel.message}</p>}
          </div>
        </div>

        <div>
          <label className="relative flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs font-bold text-gray-700 ps-2">
              <FaAsterisk className="text-red-500 text-sm pe-2" />
              <span className='font-extrabold '>Preffered Services</span>
              <TooltipButton content={<p>Select the Services you're interested in</p>} />
            </div>
            <div className="flex justify-between items-center gap-1">
              <span className="text-red-500 bg-stone-200 px-3 p-1 rounded-full font-bold text-[14px]">
                {selectedServices.length}&nbsp;/&nbsp;{servicesOptions.length}
              </span>
              {selectedServices.length > 0 && (
                <button
                  onClick={() => setSelectedServices([])}
                  type="button"
                  className="bg-black px-3 p-1 rounded-full text-white hover:bg-slate-700 duration- transition-all"
                >
                  Clear all
                </button>
              )}
            </div>
          </label>
          <select
            name="services"
            onChange={handleServiceChange}
            className={`mt-1 block w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Select services</option>
            {servicesOptions.map((service, index) => (
              <option
                key={index}
                value={service}
                className={selectedServices.includes(service) ? 'bg-gray-400' : ''}
                disabled={selectedServices.includes(service)}
              >
                {service}
              </option>
            ))}
          </select>

          <div className="w-full flex-wrap flex gap-2 ps-2 py-1">
            {selectedServices.map((item, index) => (
              <div key={index} className="text-xs font-sans font-bold w-full flex items-start justify-between gap-2 text-blue-700 rounded-full">
                <div className="flex gap-1">
                  <p className="w-fit">{item}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeService(item)}
                  className="ml-2 text-xs text-gray-500 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {errors.preferredServices && (
            <p className="text-red-500 ps-4 text-[10px]">{errors.preferredServices.message}</p>
          )}
        </div>
        {selectedServices.includes('Visa Processing Services') && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-2">
                <FaAsterisk className='text-red-500 text-sm pe-2' />
                <span className='font-extrabold'>Visa Service Type</span>
                <TooltipButton content={<p>Select the type of visa service you're interested in</p>} />
              </label>
              <select
                {...register('visaServiceType')}
                value={selectedVisaServiceType}
                onChange={(e) => {
                  setSelectedVisaServiceType(e.target.value);
                  // Reset specific visa service when type changes
                  setSelectedVisaService('');
                  setValue('visaService', '');
                }}
                className="mt-1 block w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Visa Service Type</option>
                {Object.keys(visaServiceOptions).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.visaServiceType && (
                <p className="text-red-500 ps-4 text-[10px]">{errors.visaServiceType.message}</p>
              )}
            </div>

            <div>
              <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-2">
                <FaAsterisk className='text-red-500 text-sm pe-2' />
                <span className='font-extrabold'>Specific Visa Service</span>
                <TooltipButton content={<p>Select the specific visa service you're interested in</p>} />
              </label>
              <select
                {...register('visaService')}
                value={selectedVisaService}
                onChange={(e) => setSelectedVisaService(e.target.value)}
                disabled={!selectedVisaServiceType}
                className={`mt-1 block w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 
                  ${!selectedVisaServiceType ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <option value="">
                  {selectedVisaServiceType 
                    ? 'Select Specific Visa Service' 
                    : 'Select Visa Service Type First'}
                </option>
                {selectedVisaServiceType && 
                  visaServiceOptions[selectedVisaServiceType].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))
                }
              </select>
              {errors.visaService && (
                <p className="text-red-500 ps-4 text-[10px]">{errors.visaService.message}</p>
              )}
            </div>
          </div>
        )}

        <div>
          <label className="gap-1 flex items-center text-xs font-bold text-gray-700 ps-2">
            <span className='font-extrabold '>Message (Optional)</span>
            <TooltipButton content={<p>Let us know if you have any special requests or additional details regarding your booking.</p>} />
            <span className="text-blue-500 px-4 font-normal">
              {message.length}/100 letters left
            </span>
          </label>
          <textarea
            {...register('message')}
            placeholder="Feel free to let us know about any special requests or questions (optional)..."
            maxLength={100}
            className="mt-1 block w-full border-stone-400 border outline-none text-stone-950 p-2 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="w-full flex justify-between flex-wrap items-center py-2">
          <div className="flex flex-wrap gap-2 items-center">
            <img src={mapIcon} alt="map" className='h-10 w-10' />
            <div className="inline-flex items-center px-3 py-1 border-2 border-black bg-black text-blue-200 rounded-full text-xs shadow-sm transition-colors duration-300 cursor-default">
              Dubai
            </div>
            <div className="inline-flex items-center px-3 py-1 border-2 border-black bg-black text-blue-200 rounded-full text-xs shadow-sm transition-colors duration-300 cursor-default">
              Ernakulam
            </div>
            <div className="inline-flex items-center px-3 py-1 border-2 border-black bg-black text-blue-200 rounded-full text-xs shadow-sm transition-colors duration-300 cursor-default">
              Trivandrum
            </div>
          </div>
          <button
            className="overflow-hidden relative w-28 h-10 bg-black text-white border-none rounded-md text-base font-bold cursor-pointer group"
          >
            Lets Talk !
            <span
              className="absolute w-36 h-32 -top-8 -left-2 bg-red-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"
            ></span>
            <span
              className="absolute w-36 h-32 -top-8 -left-2 bg-red-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"
            ></span>
            <span
              className="absolute w-36 h-32 -top-8 -left-2 bg-red-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"
            ></span>
            <span
              className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute text-base top-2 left-5 z-10"
            >Lets Talk !</span>
          </button>
        </div>

        <div className="flex justify-evenly items-center w-full flex-wrap text-black  ">
          <span>follow us</span>

          <SocialMediaIcons
            icon={
              <FaGlobeAmericas
                className=" md:text-2xl text-lg hover:text-black transition-all duration-300 ease-in-out text-stone-600" />
            }
            link={"/site"}
          />
          <SocialMediaIcons
            icon={
              <SiGooglemybusiness
                className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-blue-600" />
            }
            link={"https://www.google.com/search?q=sky+world+tours+%26+travels&oq=SKY+WORLD+TOURS+%26+TRAVELS&gs_lcrp=EgZjaHJvbWUqBwgAEAAYgAQyBwgAEAAYgAQyDQgBEC4YrwEYxwEYgAQyBwgCEAAYgAQyBwgDEAAYgAQyCAgEEAAYFhgeMggIBRAAGBYYHjIICAYQABgWGB4yCAgHEAAYFhgeMggICBAAGBYYHjIICAkQABgWGB7SAQg4MDYyajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&dlnr=1&ved=2ahUKEwi57ZDd7pSKAxXIwjgGHaWYD2MQl6ENegQIDhAE#dlnr=1"}
          />
          {/* <SocialMediaIcons
            icon={
              <FaLocationDot
                className=" md:text-2xl text-lg hover:text-black transition-all duration-300 ease-in-out text-blue-600" />
            }
            link={"https://maps.app.goo.gl/YitZroxLtcdPE4y67"}
          /> */}
          <SocialMediaIcons
            icon={
              <FaFacebookF className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-blue-500" />
            }
            link={"https://www.facebook.com/profile.php?id=61570017247047"}
          />
          <SocialMediaIcons
            icon={
              <FaInstagram className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-pink-500" />
            }
            link={"https://www.instagram.com/skyworld4all/"}
          />
          <SocialMediaIcons
            icon={
              <FaYoutube className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-red-500" />
            }
            link={"https://www.youtube.com/channel/UCBFv14WYl3c9dejPxZ-6BNw"}
          />
          {/* <SocialMediaIcons
            icon={
              <FaPinterest className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-red-600" />
            }
            link={"#"}
          /> */}
          <SocialMediaIcons
            icon={
              <FaLinkedin className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-blue-600" />
            }
            link={"https://www.linkedin.com/in/sky-world-tours-and-travels-4b6773340/"}
          />
          <SocialMediaIcons
            icon={
              <FaWhatsapp className=" md:text-2xl text-lg transition-all duration-300 ease-in-out hover:text-black text-green-500" />
            }
            link={"https://api.whatsapp.com/send/?phone=%2B919446004261&text=Hello%2C+I+am+interested+to+know+more+about+your+service.&type=phone_number&app_absent=0"}
          />



        </div>
      </form>
    </div>

  );
};

export default ContactForm;

