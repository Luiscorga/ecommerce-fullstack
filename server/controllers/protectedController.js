exports.getProfile = (req, res) => {
  res.json({ message: 'Your profile info', user: req.user });
};

exports.getAdminDashboard = (req, res) => {
  res.json({ message: 'Admin dashboard', user: req.user });
};