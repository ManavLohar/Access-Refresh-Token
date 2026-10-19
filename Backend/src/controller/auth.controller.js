import {
  getAccessTokenService,
  loginService,
  registerService,
} from "../services/auth.service.js";

const registerController = async (req, res) => {
  let { accessToken, refreshToken, newUser } = await registerService(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 10 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "User registered successfully!",
    user: newUser,
  });
};

const loginController = async (req, res) => {
  const { accessToken, refreshToken, isExisted } = await loginService(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 10 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "User loggedIn successfully!",
    user: isExisted,
  });
};

const getAccessTokenController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized request!",
    });
  }

  let accessToken = await getAccessTokenService(refreshToken);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 10 * 60 * 1000,
  });

  return res.status(200).json({
    message: "Access token generated!",
  });
};

export { registerController, loginController, getAccessTokenController };
