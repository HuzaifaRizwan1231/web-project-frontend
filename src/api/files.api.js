const files = [
  {
    id: 1,
    name: "index.html",
    content: `<!DOCTYPE html>
      <html>
      <head>
        <title>Sample Page</title>
      </head>
      <body>
        <h1>Hello, world!</h1>
      </body>
      </html>`,
  },
  {
    id: 2,
    name: "style.css",
    content: `body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        margin: 0;
        padding: 20px;
      }`,
  },
  {
    id: 3,
    name: "app.js",
    content: `console.log('Hello from app.js');
      
      function greet(name) {
        return \`Hello, \${name}!\`;
      }
      
      console.log(greet('Alice'));`,
  },
  {
    id: 4,
    name: "utils.js",
    content: `export function sum(a, b) {
        return a + b;
      }
      
      export function multiply(a, b) {
        return a * b;
      }`,
  },
];

export const getFilesApiCall = async () => {
  try {
    const response = await {
      data: {
        success: true,
        data: files.map((f) => {
          const splitted = f.name.split(".");
          return {
            ...f,
            extension: splitted[splitted.length - 1],
            saved: true,
            oldContent: f.content,
          };
        }),
      },
    };
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getFileContentByIdApiCall = async (id) => {
  try {
    const response = await {
      data: { success: true, data: files.find((f) => f.id == id).content },
    };
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const saveFileContentByIdApiCall = async (id) => {
  try {
    const response = await {
      data: { success: true },
    };
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
