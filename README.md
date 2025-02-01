# FAQ API
An API for managing FAQs with multi-language support, real-time caching and translations.

## Features ✨
- Multi-language Support (Auto-translation via OpenAI)
- Real-time Caching with Redis
- CRUD Operations for FAQs
- Unit & Integration Tests

## Built With 
| Component        | Technology                |
|------------------|---------------------------|
| Runtime          | Node.js 18+               |
| Framework        | Express.js                |
| Database         | MongoDB Atlas             |
| Cache            | Redis                     |
| Testing          | Jest + SuperTest          |

## Installation

### 1. Manual Setup

#### 1. Clone the repo
```bash
  git clone https://github.com/Adi-204/BharatFD_FAQAPI.git
```

#### 2. Install npm packages in backend
```bash
  cd backend
  npm install
```

#### 3. Configure environment variables:
- Create a .env file in the backend directory and add the following variables:
- For Backend .env
```bash
  DATABASE_URL=your_mongoDB_uri
  PORT=3000
  REDIS_HOST=your_redis_host_uri
  REDIS_PORT=your_redis_port
```
#### 6. Run Backend with command
- In a new terminal 
```bash
  npm start
```

### 2. Docker Setup

#### 1. Clone the repo
```bash
  git clone https://github.com/Adi-204/BharatFD_FAQAPI.git
```

#### 2. Run the follwing command
```bash
  cd backend
  docker-compose up --build
```

Note - Do not close the docker container

## API Endpoint
Faq Routes:
- GET /api/faqs - Get all FAQs
  - Query params: lang (default: 'en')
  
Example Request: 
```bash
curl -X GET "http://localhost:8000/api/faqs?lang=hi"
```
Example Response:

```bash
{
  "message": "FAQs fetched successfully",
  "faqs": [
    {
      "question": "एक फिक्स्ड डिपॉजिट कौन खोल सकता है?",
      "answer": "कोई भी भारतीय नागरिक जो 18 वर्ष या उससे अधिक उम्र का है और उसके पास पैन कार्ड और आधार जैसे वैध पहचान दस्तावेज हैं, एक फिक्स्ड डिपॉजिट खोल सकता है।"
    }
  ]
}
```

- POST /api/faqs - Create new FAQ

Example Request: 
```bash
curl -X POST "http://localhost:8000/api/faqs"
```
Example Response:

```bash
{
  "message": "FAQs created successfully",
  "faqs": {
    "question": "Who can open a Fixed Deposit?",
    "answer": "Any Indian citizen who is 18 years old or older and has valid identification documents like a PAN card and Aadhaar can open a Fixed Deposit.",
    "translations": {
      "question_en": {
        "text": "Who can open a Fixed Deposit?",
        "_id": "679e0ff243266e2b85716be1"
      },
      "answer_en": {
        "text": "Any Indian citizen who is 18 years old or older and has valid identification documents like a PAN card and Aadhaar can open a Fixed Deposit.",
        "_id": "679e0ff243266e2b85716be2"
      },
      "question_hi": {
        "text": "एक फिक्स्ड डिपॉजिट कौन खोल सकता है?",
        "_id": "679e0ff243266e2b85716be3"
      },
      "answer_hi": {
        "text": "कोई भी भारतीय नागरिक जो 18 वर्ष या उससे अधिक उम्र का है और उसके पास पैन कार्ड और आधार जैसे वैध पहचान दस्तावेज हैं, एक फिक्स्ड डिपॉजिट खोल सकता है।",
        "_id": "679e0ff243266e2b85716be4"
      },
      "question_bn": {
        "text": "কে একটি নির্দিষ্ট আমানত খুলতে পারে?",
        "_id": "679e0ff243266e2b85716be5"
      },
      "answer_bn": {
        "text": "যে কোনও ভারতীয় নাগরিক যিনি 18 বছর বা তার বেশি বয়সী এবং প্যান কার্ড এবং আধারের মতো বৈধ সনাক্তকরণের নথি রয়েছে একটি নির্দিষ্ট আমানত খুলতে পারেন।",
        "_id": "679e0ff243266e2b85716be6"
      }
    },
    "_id": "679e0ff243266e2b85716be0",
    "__v": 0
  }
}
```

- PUT /api/faqs/:id - Update FAQ
Example Request: 
```bash
curl -X PUT "http://localhost:8000/api/:id"
```
Example Response:

```bash
{
  "message": "FAQ updated successfully",
  "faq": {
    "_id": "679e0ff243266e2b85716be0",
    "question": "Who can open a Fixed Deposit?",
    "answer": "Any Indian citizen who is 18 years old or older and has a valid identification documents like a PAN card and Aadhaar can open a Fixed Deposit.",
    "translations": {
      "question_en": {
        "text": "Who can open a Fixed Deposit?",
        "_id": "679e11ff43266e2b85716bea"
      },
      "answer_en": {
        "text": "Any Indian citizen who is 18 years old or older and has a valid identification documents like a PAN card and Aadhaar can open a Fixed Deposit.",
        "_id": "679e11ff43266e2b85716beb"
      },
      "question_hi": {
        "text": "एक फिक्स्ड डिपॉजिट कौन खोल सकता है?",
        "_id": "679e11ff43266e2b85716bec"
      },
      "answer_hi": {
        "text": "कोई भी भारतीय नागरिक जो 18 वर्ष या उससे अधिक उम्र का है और उसके पास पैन कार्ड और आधार जैसे वैध पहचान दस्तावेज हैं, वह एक निश्चित जमा खोल सकता है।",
        "_id": "679e11ff43266e2b85716bed"
      },
      "question_bn": {
        "text": "কে একটি নির্দিষ্ট আমানত খুলতে পারে?",
        "_id": "679e11ff43266e2b85716bee"
      },
      "answer_bn": {
        "text": "যে কোনও ভারতীয় নাগরিক যিনি 18 বছর বা তার বেশি বয়সী এবং একটি প্যান কার্ড এবং আধারের মতো বৈধ সনাক্তকরণের নথি রয়েছে একটি নির্দিষ্ট আমানত খুলতে পারেন।",
        "_id": "679e11ff43266e2b85716bef"
      }
    },
    "__v": 0
  }
}
```

- DELETE /api/faqs/:id - Delete FAQ
Example Request: 
```bash
curl -X DELETE "http://localhost:8000/api/:id"
```
Example Response:

```bash
{
    "message":"FAQ deleted successfully"
}
```

## Testing
```bash
# Run tests
npm test

# Run specific test file
npm test tests/integrations/faqs.test.js

```
## Contributing
We welcome contributions from the community to enhance FAQAPI and make it even more valuable for users. If you'd like to contribute, please follow these steps:
- Fork the repository.
- Create a new branch for your feature or bug fix.
- Commit your changes and push the branch to your fork.
- Submit a pull request with a detailed description of your changes.
  
## Contact

- For questions, feedback, or support, please contact us at adiboghawala@gmail.com.
