#!/bin/sh
PRIVATE_KEY_FILE='privatekey.pem'
CERTIFICATE_FILE='certificate.pem'
CERT_REQUEST_FILE='certrequest.csr'

# Generate private key
openssl genrsa -out ${PRIVATE_KEY_FILE} 1024
# Generate certificate request file with private key
openssl req -new -key ${PRIVATE_KEY_FILE} -out ${CERT_REQUEST_FILE}
# Generate certificate file with private key and certificate request
openssl x509 -req -in ${CERT_REQUEST_FILE} -signkey ${PRIVATE_KEY_FILE} -out ${CERTIFICATE_FILE}
