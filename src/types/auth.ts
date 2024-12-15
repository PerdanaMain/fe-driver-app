type LoginResponse = {
  status: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  };
};

type LoginCredentials = {
  email: string;
  password: string;
};
