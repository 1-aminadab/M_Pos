import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import i18n from '../../../language/i18n';

const TermsAndConditionsScreen = () => {
  return (
    <View style={{zIndex:-1}}>
        <TopNavigationBar
        NavigationTitle={i18n.t("term_regulation")}
        IsSetting={false}
        backIcon={true}
        />
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.title}>Terms and Conditions</Text>
          {/* Add your terms and conditions content here */}
          <Text style={styles.sectionTitle}>1. Introduction</Text>
          <Text style={styles.sectionText}>
            These Terms and Conditions govern your use of the YourApp mobile
            application operated by YourCompany.
          </Text>
          <Text style={styles.sectionTitle}>2. User Accounts</Text>
          <Text style={styles.sectionText}>
            You are responsible for maintaining the confidentiality of your
            account and password and for restricting access to your device.
          </Text>
          <Text style={styles.sectionTitle}>3. User Content</Text>
          <Text style={styles.sectionText}>
            By submitting User Content to YourApp, you grant YourCompany a
            worldwide, non-exclusive, royalty-free, sublicensable, and
            transferable license to use, reproduce, distribute, prepare
            derivative works of, and display the User Content in connection with
            YourApp.
          </Text>
          {/* Add more sections as needed */}
          <Text style={styles.footer}>
            These Terms and Conditions were last updated on January 1, 2024.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 20,
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
});

export default TermsAndConditionsScreen;
