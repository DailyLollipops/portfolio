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
  useTheme,
} from "@mui/material";
import { FaRegPaperPlane } from "react-icons/fa";
import emailjs from "emailjs-com";

const Field = ({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) => (
  <Box>
    <Typography
      component="label"
      htmlFor={htmlFor}
      variant="body2"
      fontWeight={600}
      display="block"
      mb={1}
    >
      {label}
    </Typography>
    {children}
  </Box>
);

export const ContactSection = () => {
  const theme = useTheme();
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
    <Box id="contact" pt={4} pb={8}>
      <Typography variant="h2" mb={1}>
        Contact
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Have a question or want to collaborate? Open a new issue below - send
        me a message.
      </Typography>

      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 1,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
          maxWidth: 720,
        }}
      >
        {/* GitHub-style editor tab bar */}
        <Box
          display="flex"
          alignItems="center"
          mb={2}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "6px 6px 0 0",
            backgroundColor:
              theme.palette.mode === "dark" ? "#161b22" : "#f6f8fa",
            px: 2,
            py: 1,
          }}
        >
          <Typography variant="caption" fontWeight={600} color="text.primary">
            Write a message
          </Typography>
          <Box flex={1} />
          <Typography variant="caption" color="text.secondary">
            Markdown supported
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <Field label="Your name" htmlFor="contact-name">
              <TextField
                id="contact-name"
                name="name"
                placeholder="Jane Doe"
                fullWidth
                variant="outlined"
                value={form.name}
                onChange={handleChange}
                required
              />
            </Field>
            <Field label="Your email" htmlFor="contact-email">
              <TextField
                id="contact-email"
                name="email"
                placeholder="you@example.com"
                type="email"
                fullWidth
                variant="outlined"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Field>
            <Field label="Message" htmlFor="contact-message">
              <TextField
                id="contact-message"
                name="message"
                placeholder="Tell me about your project…"
                fullWidth
                multiline
                minRows={5}
                variant="outlined"
                value={form.message}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  },
                }}
              />
            </Field>

            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                type="submit"
                disabled={loading}
                startIcon={!loading ? <FaRegPaperPlane size={13} /> : undefined}
              >
                {loading ? "Sending…" : "Send message"}
              </Button>
            </Box>
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
            ? "Message sent successfully!"
            : "Failed to send message. Please try again."}
        </Alert>
      </Snackbar>
    </Box>
  );
};