const auth = require("../middlewares/authMiddleware");
const admin = require("../config/firebaseConfig");

const db = admin.firestore();

exports.registerWithEmailAndPassword = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    console.log(email, password);

    const userResponse = await admin.auth().createUser({ email, password });
    console.log(userResponse.user.uid);

    res.status(200).json({ uid:userResponse.user.uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginWithEmailAndPassword = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const uid = await auth.loginWithEmailAndPassword(email, password);
    res.status(200).json({ uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginWithGoogle = async (req, res, next) => {
  console.log(111);


  // const { idToken } = req.body;
  try {
    // const uid = await auth.loginWithGoogle(idToken);
    // res.status(200).json({ uid });
    res.status(200).json({ user:req.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginWithFacebook = async (req, res, next) => {
  const { accessToken } = req.body;
  try {
    const uid = await auth.loginWithFacebook(accessToken);
    res.status(200).json({ uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkAuthStatus = async (req, res, next) => {
  const uid = req.params.uid;
  try {
    const userRecord = await auth.checkAuthStatus(uid);
    res.status(200).json({ user: userRecord.toJSON() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
