import React, {FunctionComponent, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  Card,
  Title,
  Modal,
  IconButton,
  Divider,
  Button,
} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {LANGUAGES} from '../utils/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {getLang, parseObject} from '../utils/Util';
import RNRestart from 'react-native-restart';
import {storeData, STORAGE_KEYS} from '../utils/Storage';
import {Lang} from '../interfaces/lang';
import usePreferences from '../hooks/usePreferences';

const {width: widthWindow, height: heightWindow} = Dimensions.get('window');

interface SettingsProps {}

const Settings: FunctionComponent<SettingsProps> = () => {
  const [showModalLanguage, setShowModalLanguage] = useState(false);
  const {t} = useTranslation();
  return (
    <>
      <View style={{marginHorizontal: 16, marginTop: 16}}>
        <Card onPress={() => setShowModalLanguage(true)}>
          <Card.Title title={t('settings.language')} />
        </Card>
      </View>
      <ModalLanguage
        showModal={showModalLanguage}
        setShowModal={setShowModalLanguage}
      />
    </>
  );
};

interface ModalLanguageProps {
  showModal: boolean;
  setShowModal: (visible: boolean) => void;
}

const ModalLanguage = ({showModal, setShowModal}: ModalLanguageProps) => {
  const {theme} = usePreferences();
  const [langSelected, setLangSelected] = useState('en');
  const {t, i18n} = useTranslation();

  const restart = () => {
    setTimeout(() => {
      RNRestart.Restart();
    }, 400);
  };
  const onLangChange = (lang: Lang) => {
    setLangSelected(lang.key);
    i18n.changeLanguage(lang.languageTag);
    storeData(STORAGE_KEYS.LANG, lang).then(_ => {
      restart();
    });
  };

  useEffect(() => {
    getLang().then(data => {
      const language = parseObject<Lang>(data);
      setLangSelected(language?.key || 'en');
    });
  }, []);

  return (
    <Modal
      contentContainerStyle={[
        styles.modalContent,
        {backgroundColor: theme === 'dark' ? '#28293D' : '#fff'},
      ]}
      dismissable={true}
      visible={showModal}
      onDismiss={() => setShowModal(false)}>
      <View>
        <Title style={styles.title}>{t('settings.selectLanguage')}</Title>
        <Divider bold />
        {Object.entries(LANGUAGES).map(([keyString, value]) => (
          <View
            key={keyString}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              onPress={() => onLangChange(value)}
              style={styles.languageItem}
              mode="text"
              labelStyle={{fontSize: 16}}>
              {(value as Lang).description}
            </Button>
            {langSelected === (value as Lang).key ? (
              <Icon
                style={{position: 'absolute', right: 110}}
                name="checkmark-outline"
                size={24}
                color={theme === 'dark' ? '#fff' : '#000'}
              />
            ) : undefined}
          </View>
        ))}
      </View>
      <IconButton
        style={styles.closeModal}
        icon="close"
        iconColor="#fff"
        onPress={() => setShowModal(false)}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  modalContent: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: widthWindow * 0.8,
    height: heightWindow * 0.2,
    borderRadius: 20,
  },
  closeModal: {
    height: 50,
    bottom: -80,
    alignSelf: 'center',
    width: 50,
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: '#1ea1f2',
  },
  languageItem: {
    textAlign: 'center',
    borderRadius: 0,
    width: '100%',
  },
  languageText: {
    fontSize: 20,
  },
});

export default Settings;
