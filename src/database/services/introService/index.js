import realm from '../../index';

export const getIntro = () => {
  const intro = realm.objects('Intro')[0];
  if (intro) {
    return intro;
  } else {
    // Create a new "Finance" object with default values
    realm.write(() => {
      realm.create('Intro', {
        started: false,
        loginConfetti: false,
        addProductConfetti: false,
        transactionConfetti: false,
        paymentConfetti: false,
        syncProduct: false
      });
    });
    return intro;
  }
};

export const setIntro = Intro_Obj => {
  realm.write(() => {
    let setIntro = realm.objects('Intro')[0];
    if (setIntro) {
      setIntro.started = Intro_Obj.hasOwnProperty('started')
        ? Intro_Obj.started
        : setIntro.started;
      setIntro.loginConfetti = Intro_Obj.hasOwnProperty('loginConfetti')
        ? Intro_Obj.loginConfetti
        : setIntro.loginConfetti;
      setIntro.addProductConfetti = Intro_Obj.hasOwnProperty(
        'addProductConfetti',
      )
        ? Intro_Obj.addProductConfetti
        : setIntro.addProductConfetti;
      setIntro.transactionConfetti = Intro_Obj.hasOwnProperty(
        'transactionConfetti',
      )
        ? Intro_Obj.transactionConfetti
        : setIntro.transactionConfetti;   
      setIntro.paymentConfetti = Intro_Obj.hasOwnProperty('paymentConfetti')
        ? Intro_Obj.paymentConfetti
        : setIntro.paymentConfetti;
       setIntro.syncProduct = Intro_Obj.hasOwnProperty('syncProduct')
        ? Intro_Obj.syncProduct
        : setIntro.syncProduct;
    }
  });
};
