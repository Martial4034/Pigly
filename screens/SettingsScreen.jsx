import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, FlatList, SafeAreaView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Reusable/Header';
import { useUser } from '../context/UserContext';
import { main } from '../constants/color';

const SettingItem = ({ title, isSwitch, onToggle, isEnabled }) => (
  <TouchableOpacity style={styles.settingItem} onPress={isSwitch ? null : onToggle}>
    <Text style={styles.settingText}>{title}</Text>
    {isSwitch ? (
      <Switch
        trackColor={{ false: "#767577", true: main.LogoPink }}
        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
        onValueChange={onToggle}
        value={isEnabled}
      />
    ) : (
      <Text style={styles.settingArrow}>→</Text>
    )}
  </TouchableOpacity>
);

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { profile, toggleNotifications } = useUser();
  console.log({ profile });

  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(true); // Dark mode est toujours activé

  const toggleNotificationSwitch = () => {
    const newNotificationsValue = !profile.notifications;
    toggleNotifications(newNotificationsValue);
    console.log(`Notifications ${newNotificationsValue ? 'activées' : 'désactivées'}`);
  };


  // Ajoutez des fonctions pour chaque action ici
  const goToPrivacyPolicy = () => console.log('Politique de confidentialité');
  const goToSupport = () => console.log('Support');
  const changeEmail = () => navigation.navigate('ChangeEmailScreen');
  const changePassword = () => navigation.navigate('ChangePasswordScreen');

  const settingsOptions = [
    {
      title: 'Mode sombre',
      isSwitch: true,
      isEnabled: isDarkModeEnabled,
      onToggle: () => console.log('Le mode sombre ne peut pas être désactivé')
    },
    {
      title: 'Notification',
      isSwitch: true,
      isEnabled: profile.notifications,
      onToggle: toggleNotificationSwitch
    },
    {
      title: 'Politique de confidentialité',
      isSwitch: false,
      onToggle: goToPrivacyPolicy
    },
    {
      title: 'Support',
      isSwitch: false,
      onToggle: goToSupport
    },
    {
      title: 'Changer l\'adresse Email',
      isSwitch: false,
      onToggle: changeEmail
    },
    {
      title: 'Changer de mot de passe',
      isSwitch: false,
      onToggle: changePassword
    },
  ];

  return (
    <View style={styles.container}>
      <Header />
      <SafeAreaView style={styles.safeAreaView}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Text style={styles.title}>Paramètre</Text>
      <FlatList
        data={settingsOptions}
        renderItem={({ item }) => (
          <SettingItem
            title={item.title}
            isSwitch={item.isSwitch}
            isEnabled={item.isEnabled}
            onToggle={item.onToggle}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    lineHeight: 50,
    textAlign: 'center',
    color: "#fff",
  },
  container: {
    backgroundColor: main.LogoBlack,
    flex: 1,
    padding: 14
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  settingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingArrow: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  safeAreaView: {
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  backText: {
    color: main.LogoPink,
    fontSize: 16,
  },
});

export default SettingsScreen;