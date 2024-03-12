OAuth 2.0 Flow Summary:

1-Client initiates OAuth 2.0 flow by calling the Single Sign-On (SSO) link with query parameters scope=openid and redirect_uri={{domain}}.

2-SSO redirects back to redirect_uri alongside a query param of code={{code}}.

3-Client extracts the code and makes a POST request to the backend with the extracted code.

4-Backend processes the request and returns a response with authorization and refresh-token headers.

refer to `finger-print.postman_collection.json` by importing into Postman for API documentations.

permissions needed for a user to perform user and namespace CRUD

`"namespacePermissions": {
    "namespace":{
        "name": "finger-print"
    },
    "permissionList": {
        "permissionList": [
            "user:read",
            "user:write",
            "user:edit",
            "user:view",
            "namespace:read",
            "namespace:write",
            "namespace:edit",
            "namespace:view",
        ]
    }
}`
