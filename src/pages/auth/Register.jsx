import { Form, Input, Button, Divider, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuthStore } from "../../store/authStore";
useAuthStore;

export default function Register() {
  const registerUser = useAuthStore((s) => s.register);
  const loading = useAuthStore((s) => s.loading);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await registerUser(values);
      message.success("Account created successfully");
      navigate("/login");
    } catch (err) {
      const errorMsg =
        err?.response?.data?.detail ||
        "Registration failed. Please check your inputs";
      message.error(errorMsg);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white px-6 py-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {/* Header */}
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Create account
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get started with Kagazzy
          </p>
        </div>

        {/* OAuth */}
        <div className="flex flex-col gap-3">
          <button className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-2.5 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <FcGoogle size={18} />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Continue with Google
            </span>
          </button>

          <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#1877F2] py-2.5 text-sm font-medium text-white transition hover:opacity-90">
            <FaFacebook size={16} />
            Continue with Facebook
          </button>
        </div>

        <Divider className="my-8! dark:border-gray-800!">
          <span className="text-xs uppercase tracking-wide text-gray-500">
            or
          </span>
        </Divider>

        {/* Form */}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={
              <span className="text-sm dark:text-gray-300">First name</span>
            }
            name="first_name"
            rules={[{ required: true, message: "First name is required" }]}
          >
            <Input size="large" variant="filled" />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-sm dark:text-gray-300">Last name</span>
            }
            name="last_name"
            rules={[{ required: true, message: "Last name is required" }]}
          >
            <Input size="large" variant="filled" />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-sm dark:text-gray-300">Phone number</span>
            }
            name="phone_number"
          >
            <Input
              size="large"
              variant="filled"
              placeholder="+977 98xxxxxxxx"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-sm dark:text-gray-300">Email</span>}
            name="email"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input
              size="large"
              variant="filled"
              placeholder="email@example.com"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-sm dark:text-gray-300">Password</span>}
            name="password1"
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "Minimum 6 characters" },
            ]}
          >
            <Input.Password size="large" variant="filled" />
          </Form.Item>

          <Form.Item
            label={
              <span className="text-sm dark:text-gray-300">
                Confirm password
              </span>
            }
            name="password2"
            dependencies={["password1"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password1") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match");
                },
              }),
            ]}
          >
            <Input.Password size="large" variant="filled" />
          </Form.Item>

          <Form.Item className="pt-2">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700!"
            >
              Create account
            </Button>
          </Form.Item>
        </Form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
