module.exports = {
    apps: [
      {
        name: 'service-app',
        script: './dist/index.js',
        env: {
          NODE_ENV: 'production',
          dsnGeneralName: 'dsnGeneralSrvPrueba',
          dsnGeneralUser: 'juan',
          dsnGeneralPass: '5871',
          dsnServicesName: 'dsnServicios',
          dsnServicesUser: 'juan',
          dsnServicesPass: '5871',
          PORT: 3002,
        }
      }
    ]
  };
  