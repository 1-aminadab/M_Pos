import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Animated} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Logo from '../../../assets/images/logowithname.png';

import {color} from '../../../styles/Styles';
import {Image} from 'react-native';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import i18n from '../../../language/i18n';

const AboutUsScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setShowContent(true);
    }, 500); // Animate content with a slight delay after fade-in
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      <TopNavigationBar
        NavigationTitle={i18n.t("about_us")}
        backIcon={false}
        IsSetting={true}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Main Content */}
        <View style={styles.content}>
          {/* Logo (with optional animation) */}
          <Animated.View
            style={[styles.logoContainer, {transform: [{scale: fadeAnim}]}]}>
            <Image source={Logo} style={styles.logo} />
          </Animated.View>
          {showContent && ( // Display content only after animation
            <>
              {/* About Us Section */}
              <Text style={styles.sectionTitle}>About Us</Text>
              <Text style={styles.sectionText}>
                Welcome to Addis Pay, a leader in financial technology.
                We deliver innovative, secure payment solutions tailored for
                success. With our track record of excellence, trust us to
                navigate modern finance. Join us today in shaping the future of
                payments.
              </Text>
              {/* Our Team Section */}
              <Text style={styles.sectionTitle}>Our Team</Text>
              <View style={styles.teamContainer}>
                <View style={styles.teamMember}>
                  {/* Optional: Add team member icons */}
                  {/* <AntDesign name="user" size={24} color="black" /> */}
                  <Text style={styles.memberName}>Addis Pay</Text>
                </View>
                {/* Add more team members here */}
              </View>
              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Contact Us: contact@example.com
                </Text>
                {/* Add social media icons here */}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primaryLight, // Use a lighter shade of your primary color
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 150, // Adjust logo width for better scaling
    height: 120, // Adjust logo height for better scaling
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: color.textPrimary, // Use your primary text color
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24, // Improved line spacing for readability
    marginBottom: 25,
    textAlign: 'center',
    color: color.textSecondary, // Use your secondary text color
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  teamMember: {
    alignItems: 'center',
  },
  memberName: {
    fontSize: 18,
    fontWeight: '500', // Slightly bolder text for team members
    color: color.textPrimary,
  },
  footer: {
    marginBottom: 20, // Added some margin for better spacing
  },
  footerText: {
    fontSize: 16,
    color: color.textSecondary,
  },
});

export default AboutUsScreen;
