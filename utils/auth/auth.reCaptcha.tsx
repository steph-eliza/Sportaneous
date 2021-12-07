import Firebase from "./container/Firebase"
import { getAuth, RecaptchaVerifier} from "firebase/auth";
import { app } from "../config";

const auth = getAuth();
auth.useDeviceLanguage();

window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {

  }, auth);

recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
  });

const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);