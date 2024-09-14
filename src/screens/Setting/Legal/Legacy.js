import React from 'react';
import { View, } from 'react-native';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import { Iconify } from 'react-native-iconify';
import ClearLable from '../../../components/list/ClearLabel';



function Legacy({ navigation }) {
  // all legacy page content datas stored in json format and if they do not have title it can be ommited
  const PrivacyPolicyData = [
    {
      title: "1. Information We Collect",
      content: [{
        sub_title: "1.1 Personal Information",
        content: "We may collect certain personal information from you when you use the App. This may include your name, email address, phone number, and any other information you provide to us voluntarily."
      },
      {
        sub_title: "1.2 Automatically Collected Information",
        content: "When you use the App, we may automatically collect certain information from your device, including your IP address, device type, operating system, and usage data. This information is collected anonymously and is used for analytical purposes to improve the App's functionality and performance."
      }],
    },
    {
      title: "2. Use of Information",
      content: "We may use the information collected from you for various purposes, including providing and maintaining the App's functionality and features, personalizing and improving your experience, communicating with you, sending promotional and marketing communications, detecting and preventing technical issues, fraud, or illegal activities, and complying with legal obligations."
    },
    {
      title: "3. Disclosure of Information",
      content: "We may disclose your information to third parties such as service providers who perform services on our behalf, in the event of a business transfer, to comply with legal requirements or protect our rights.We may disclose your information to third parties such as service providers who perform services on our behalf, in the event of a business transfer, to comply with legal requirements or protect our rights.We may disclose your information to third parties such as service providers who perform services on our behalf, in the event of a business transfer, to comply with legal requirements or protect our rights."
    },
    {
      title: "4. Data Security",
      content: "We take reasonable measures to protect the information we collect, but we cannot guarantee absolute security."
    },
    {
      title: "5. Third-Party Links",
      content: "The App may contain links to third-party websites or services. Our Privacy Policy does not apply to those third parties, so we encourage you to review their privacy policies."
    },
    {
      title: "6. Children's Privacy",
      content: "The App is not intended for use by individuals under the age of 16, and we do not knowingly collect personal information from children under 16."
    },
    {
      title: "7. Changes to this Privacy Policy",
      content: "We may update this Privacy Policy from time to time, and any changes will be posted on this page. Please review this Privacy Policy periodically."
    },

  ]
  const TermsOfServieceData = [

    {
      title: "1. Use of the App",
      content: [
        {
          sub_title: "1.1 Eligibility",
          content: "You must be at least 18 years old and have the legal capacity to enter into a binding agreement to use the App. By using the App, you represent and warrant that you meet these eligibility requirements."
        },
        {
          sub_title: "1.2 Account",
          content: "To use certain features of the App, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access or use of your account."
        },
        {
          sub_title: "1.3 Acceptable Use",
          content: "You agree to use the App only for lawful purposes and in accordance with these Terms. You will not engage in any activity that interferes with or disrupts the functioning of the App or its associated services."
        }
      ]
    },
    {
      title: "2. Intellectual Property",
      content: [
        {
          sub_title: "2.1 Ownership",
          content: "The App and all content, features, and functionality are owned by the Company or its licensors and are protected by intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of the App without the Company's prior written consent."
        },
        {
          sub_title: "2.2 Trademarks",
          content: "All trademarks, logos, and service marks displayed on the App are the property of their respective owners. You are prohibited from using any trademarks without the prior written permission of the Company or the respective owner."
        }
      ]
    },
    {
      title: "3. Data Privacy",
      content: [
        {
          sub_title: "3.1 Collection and Use",
          content: "By using the App, you agree that the Company may collect and use your personal information as described in our Privacy Policy. It is your responsibility to review and understand our Privacy Policy."
        },
        {
          sub_title: "3.2 Security",
          content: "The Company takes reasonable measures to protect your personal information; however, we cannot guarantee the security of your data transmitted through the App. You acknowledge and accept the inherent risks associated with transmitting data over the internet."
        }
      ]
    },
    {
      title: "4. Disclaimer of Warranties",
      content: [
        {
          sub_title: "4.1 No Warranty",
          content: "The App is provided on an \"as is\" and \"as available\" basis without any warranties or representations, express or implied. The Company disclaims all warranties, including but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement."
        },
        {
          sub_title: "4.2 Limitation of Liability",
          content: "In no event shall the Company be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the App, including but not limited to, lost profits, loss of data, or business interruption."
        }
      ]
    },
    {
      title: "5. Modifications to the Terms",
      content: "The Company reserves the right to modify or update these Terms at any time without prior notice. It is your responsibility to review these Terms periodically for any changes. By continuing to use the App after the modifications, you agree to be bound by the revised Terms."
    },
    {
      title: "6. Governing Law",
      content: "These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction]. Any legal action arising out of or in connection with these Terms shall be brought in the courts of [Your Jurisdiction]."
    },

  ]
  const AboutUsData = [
    {
      content: "Addissystems PLC is ERP, Electronic Invoicing and E-POS company that delivers convenient, innovative, safe and secure financial softwares services in Ethiopia by leveraging the latest technology platform in the industry and developing user-oriented products and services."
    },



  ]

  const lables = [
    {
      lable: 'Privacy Policy',
      Icon: () => <Iconify icon="clarity:notification-solid" size={20} />,
      forwardTo: 'legacy_content',
      arrow: false,
      data: PrivacyPolicyData
    },
    {
      lable: 'Terms Of Serviece',
      Icon: () => <Iconify icon="clarity:notification-solid" size={20} />,
      forwardTo: 'legacy_content',
      arrow: false,
      data: TermsOfServieceData
    },
    {
      lable: 'About Us',
      Icon: () => <Iconify icon="clarity:notification-solid" size={20} />,
      forwardTo: 'legacy_content',
      arrow: false,
      data: AboutUsData
    },

  ];
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ paddingHorizontal: 20 }}>
        <TopNavigationBar
          backIcon={true}
          onPressBack={() => navigation.goBack()}
          middleLabel={'Legal'}
        />
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        {lables.map(({ lable, Icon, forwardTo, arrow, data }, index) => (
          <ClearLable
            key={lable}
            forward={forwardTo}
            arrow={arrow}
            lable={lable}
            Icon={Icon}
            data={data}
            navigation={navigation}
            borderBottomWidth={index < lables.length - 1 ? 1 : 0}
          />
        ))}
      </View>
    </View>
  )
}

export default Legacy