# Clone project from git

From OpenVeo root directory :

    cd node_modules/@openveo
    git clone git@github.com:veo-labs/openveo-<%= plugin %>.git <%= plugin %>

# Install project's dependencies

    cd <%= plugin %>
    npm install

# Remove installed peer dependencies

From OpenVeo plugin root directory :

    rm -Rf node_modules/@openveo