
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/api/v1/auth/login": {
        "post": {
          "operationId": "AppController_login",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateUserDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "get all reviews",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/IUser"
                  }
                }
              }
            },
            "500": {
              "description": "internal server error"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/v1/profile": {
        "get": {
          "operationId": "AppController_getProfile",
          "parameters": [],
          "responses": {
            "201": {
              "description": "get all reviews",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/IUser"
                  }
                }
              }
            },
            "500": {
              "description": "internal server error"
            }
          },
          "tags": [
            "Auth"
          ]
        }
      },
      "/api/v1/user": {
        "post": {
          "operationId": "UserController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateUserDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "get all reviews",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/IUser"
                  }
                }
              }
            },
            "500": {
              "description": "internal server error"
            }
          },
          "tags": [
            "User"
          ]
        }
      },
      "/api/v1/gallery/pagination": {
        "get": {
          "operationId": "GalleryController_findAllWithPagination",
          "parameters": [
            {
              "name": "page",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "limit",
              "required": true,
              "in": "query",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "get all images",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Gallery"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundResponse"
                  }
                }
              }
            },
            "500": {
              "description": "internal server error"
            }
          },
          "tags": [
            "Gallery"
          ]
        }
      },
      "/api/v1/gallery": {
        "post": {
          "operationId": "GalleryController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateGalleryDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "create gallery",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Gallery"
                  }
                }
              }
            },
            "500": {
              "description": "internal server error"
            }
          },
          "tags": [
            "Gallery"
          ]
        },
        "get": {
          "operationId": "GalleryController_findAll",
          "parameters": [],
          "responses": {
            "201": {
              "description": "get all images",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Gallery"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundResponse"
                  }
                }
              }
            },
            "500": {
              "description": "internal server error"
            }
          },
          "tags": [
            "Gallery"
          ]
        }
      },
      "/api/v1/gallery/{id}": {
        "get": {
          "operationId": "GalleryController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "get  image by id",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Gallery"
                  }
                }
              }
            },
            "404": {
              "description": "not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundResponse"
                  }
                }
              }
            },
            "500": {
              "description": "internal server error"
            }
          },
          "tags": [
            "Gallery"
          ]
        },
        "delete": {
          "operationId": "GalleryController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "delete image"
            },
            "404": {
              "description": "not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundResponse"
                  }
                }
              }
            },
            "500": {
              "description": "internal server error"
            }
          },
          "tags": [
            "Gallery"
          ]
        }
      },
      "/api/v1/gallery/upload": {
        "post": {
          "operationId": "GalleryController_uploadFile",
          "parameters": [],
          "responses": {
            "201": {
              "description": "upload image",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/UploadImageResponse"
                  }
                }
              }
            },
            "500": {
              "description": "internal server error"
            }
          },
          "tags": [
            "Gallery"
          ]
        }
      },
      "/api/v1/password/forgot": {
        "post": {
          "operationId": "PasswordController_forgotPassword",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ForgotPasswordDto"
                }
              }
            }
          },
          "responses": {
            "500": {
              "description": "internal server error"
            }
          },
          "tags": [
            "Password"
          ]
        }
      },
      "/api/v1/password/reset": {
        "post": {
          "operationId": "PasswordController_resetPassword",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ResetPasswordDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "reset password",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/IUser"
                  }
                }
              }
            },
            "404": {
              "description": "not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundResponse"
                  }
                }
              }
            },
            "500": {
              "description": "internal server error"
            }
          },
          "tags": [
            "Password"
          ]
        }
      },
      "/api/v1/password/change": {
        "post": {
          "operationId": "PasswordController_changePassword",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ChangePasswordDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "change password",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/IUser"
                  }
                }
              }
            },
            "404": {
              "description": "not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundResponse"
                  }
                }
              }
            },
            "500": {
              "description": "internal server error"
            }
          },
          "tags": [
            "Password"
          ]
        }
      },
      "/api/v1/testimonials": {
        "post": {
          "operationId": "TestimonialsController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateTestimonialDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "create testimonial",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Testimonial"
                  }
                }
              }
            },
            "500": {
              "description": "internal server error"
            }
          },
          "tags": [
            "Testimonials"
          ]
        },
        "get": {
          "operationId": "TestimonialsController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": "get all testimonials",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Testimonial"
                    }
                  }
                }
              }
            },
            "404": {
              "description": "not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundResponse"
                  }
                }
              }
            },
            "500": {
              "description": "internal server error"
            }
          },
          "tags": [
            "Testimonials"
          ]
        }
      },
      "/api/v1/testimonials/{id}": {
        "get": {
          "operationId": "TestimonialsController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "get single testimonial",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Testimonial"
                  }
                }
              }
            },
            "404": {
              "description": "not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundResponse"
                  }
                }
              }
            },
            "500": {
              "description": "internal server error"
            }
          },
          "tags": [
            "Testimonials"
          ]
        },
        "patch": {
          "operationId": "TestimonialsController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateTestimonialDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "update testimonial",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Testimonial"
                  }
                }
              }
            },
            "404": {
              "description": "not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundResponse"
                  }
                }
              }
            },
            "500": {
              "description": "internal server error"
            }
          },
          "tags": [
            "Testimonials"
          ]
        },
        "delete": {
          "operationId": "TestimonialsController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "delete testimonial"
            },
            "404": {
              "description": "not found",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotFoundResponse"
                  }
                }
              }
            },
            "500": {
              "description": "internal server error"
            }
          },
          "tags": [
            "Testimonials"
          ]
        }
      }
    },
    "info": {
      "title": "Baza Skill API example",
      "description": "Baza Skill API description",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "BazaSkill",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "schemas": {
        "CreateUserDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "required": [
            "email",
            "password"
          ]
        },
        "IUser": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "access_token": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "email",
            "access_token"
          ]
        },
        "Gallery": {
          "type": "object",
          "properties": {
            "image_url": {
              "type": "string",
              "description": "Url of the image"
            },
            "image_id": {
              "type": "string",
              "description": "cloudinary public id of the image"
            }
          },
          "required": [
            "image_url",
            "image_id"
          ]
        },
        "NotFoundResponse": {
          "type": "object",
          "properties": {
            "status_code": {
              "type": "number",
              "default": 404
            },
            "message": {
              "type": "string"
            }
          },
          "required": [
            "status_code",
            "message"
          ]
        },
        "CreateGalleryDto": {
          "type": "object",
          "properties": {
            "image_url": {
              "type": "string"
            },
            "image_id": {
              "type": "string"
            }
          },
          "required": [
            "image_url",
            "image_id"
          ]
        },
        "UploadImageResponse": {
          "type": "object",
          "properties": {
            "imageUrl": {
              "type": "string"
            }
          },
          "required": [
            "imageUrl"
          ]
        },
        "ForgotPasswordDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string"
            }
          },
          "required": [
            "email"
          ]
        },
        "ResetPasswordDto": {
          "type": "object",
          "properties": {
            "token": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "required": [
            "token",
            "password"
          ]
        },
        "ChangePasswordDto": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "required": [
            "email",
            "password"
          ]
        },
        "CreateTestimonialDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "review": {
              "type": "string"
            }
          },
          "required": [
            "name",
            "review"
          ]
        },
        "Testimonial": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Reviewer`s name"
            },
            "review": {
              "type": "string",
              "description": "Review text"
            }
          },
          "required": [
            "name",
            "review"
          ]
        },
        "UpdateTestimonialDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "review": {
              "type": "string"
            }
          }
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
