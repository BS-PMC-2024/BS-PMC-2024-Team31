router.post('/remove', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).send('Email is required');
    
    const result = await Admin.findOneAndDelete({ email });
    if (!result) return res.status(404).send('Admin not found');
    
    res.status(200).send('Admin removed');
  } catch (error) {
    console.error('Error removing admin:', error);
    res.status(500).send('Failed to remove admin');
  }
});
