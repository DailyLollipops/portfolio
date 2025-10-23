import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

export const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ open: boolean; success: boolean }>({
    open: false,
    success: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
      );

      setFeedback({ open: true, success: true });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email send failed:", error);
      setFeedback({ open: true, success: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id="contact"
      py={10}
      position="relative"
      sx={{
        background: "linear-gradient(135deg, #e3f2fd 0%, #f9fafb 100%)",
        overflow: "hidden",
      }}
    >
      {/* --- Animated background blobs --- */}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <motion.div
          style={{
            position: "absolute",
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "rgba(33,150,243,0.25)",
            top: "10%",
            left: "10%",
            zIndex: 0,
          }}
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "rgba(3,169,244,0.2)",
            bottom: "20%",
            right: "15%",
            zIndex: 0,
          }}
          animate={{ y: [0, -25, 0], x: [0, 25, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </Box>

      {/* --- Contact Form --- */}
      <Box position="relative" zIndex={2} textAlign="center">
        <Typography variant="h4" fontWeight={700} gutterBottom color="#0d47a1">
          Contact Me
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          mb={4}
        >
          Have a question or want to collaborate? Send me a message below 👇
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4 },
            maxWidth: 600,
            mx: "auto",
            borderRadius: 3,
            backdropFilter: "blur(8px)",
            background: "rgba(255,255,255,0.8)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                name="name"
                label="Your Name"
                fullWidth
                variant="outlined"
                value={form.name}
                onChange={handleChange}
                required
              />
              <TextField
                name="email"
                label="Your Email"
                type="email"
                fullWidth
                variant="outlined"
                value={form.email}
                onChange={handleChange}
                required
              />
              <TextField
                name="message"
                label="Message"
                fullWidth
                multiline
                minRows={4}
                variant="outlined"
                value={form.message}
                onChange={handleChange}
                required
              />
              <Button
                variant="contained"
                size="large"
                type="submit"
                disabled={loading}
                component={motion.button}
                whileHover={{ scale: 1.05 }}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </Stack>
          </form>
        </Paper>

        <Snackbar
          open={feedback.open}
          autoHideDuration={4000}
          onClose={() => setFeedback({ ...feedback, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setFeedback({ ...feedback, open: false })}
            severity={feedback.success ? "success" : "error"}
            variant="filled"
          >
            {feedback.success
              ? "Message sent successfully! 🚀"
              : "Failed to send message. Please try again."}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};
