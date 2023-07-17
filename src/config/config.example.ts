const devEnv = {
  client: {
    url: ['http://localhost:3000', 'http://{YOUR_IP_ADDRESS}:3001'],
  },
};

const prodEnv = {
  client: {
    url: ['https://www.example.com'],
  },
};

const envConfig = process.env.NODE_ENV === 'development' ? devEnv : prodEnv;

export default envConfig;
