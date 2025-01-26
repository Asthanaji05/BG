# API Documentation - JSON Schemas

## 1. API: Retrieve details of all chapters

**URL:** `https://vedicscriptures.github.io/chapters`  
**Method:** `GET`  
**Description:** Retrieve details of all chapters in Shreemad Bhagavad Gita.

### JSON Schema:
```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "chapter_number": {
        "type": "integer",
        "description": "Number of the chapter."
      },
      "verses_count": {
        "type": "integer",
        "description": "Total number of verses in the chapter."
      },
      "name": {
        "type": "string",
        "description": "Name of the chapter."
      },
      "translation": {
        "type": "string",
        "description": "Translation of the chapter name."
      },
      "transliteration": {
        "type": "string",
        "description": "Transliteration of the chapter name."
      },
      "meaning": {
        "type": "object",
        "properties": {
          "en": {
            "type": "string",
            "description": "Meaning of the chapter name in English."
          },
          "hi": {
            "type": "string",
            "description": "Meaning of the chapter name in Hindi."
          }
        },
        "required": ["en", "hi"]
      },
      "summary": {
        "type": "object",
        "properties": {
          "en": {
            "type": "string",
            "description": "Chapter summary in English."
          },
          "hi": {
            "type": "string",
            "description": "Chapter summary in Hindi."
          }
        },
        "required": ["en", "hi"]
      }
    },
    "required": ["chapter_number", "verses_count", "name", "translation", "transliteration", "meaning", "summary"]
  }
}
```

---

## 2. API: Retrieve specific slok and chapter

**URL:** `https://vedicscriptures.github.io/slok/:ch/:sl`  
**Method:** `GET`  
**Description:** Retrieve specific slok and chapter from Shreemad Bhagavad Gita.

### JSON Schema:
```json
{
  "type": "object",
  "properties": {
    "_id": {
      "type": "string",
      "description": "Unique identifier for the slok."
    },
    "chapter": {
      "type": "integer",
      "description": "Chapter number of the slok."
    },
    "verse": {
      "type": "integer",
      "description": "Verse number of the slok in the chapter."
    },
    "slok": {
      "type": "string",
      "description": "Text of the slok."
    },
    "transliteration": {
      "type": "string",
      "description": "Transliteration of the slok."
    },
    "raman": {
      "type": "object",
      "description": "Commentary by Sri Ramanuja.",
      "properties": {
        "author": {
          "type": "string",
          "description": "Sri Ramanuja"
        },
        "sc": {
          "type": "string",
          "description": "Sri Ramanuja's Sanskrit commentary."
        },
        "et": {
          "type": "string",
          "description": "English translation of Sri Ramanuja's commentary."
        }
      }
    },
    "srid": {
      "type": "object",
      "description": "Commentary by Sri Sridhara Swami.",
      "properties": {
        "author": {
          "type": "string",
          "description": "Sri Sridhara Swami"
        },
        "sc": {
          "type": "string",
          "description": "Sri Sridhara Swami's Sanskrit commentary."
        }
      }
    },
    "vallabh": {
      "type": "object",
      "description": "Commentary by Sri Vallabhacharya.",
      "properties": {
        "author": {
          "type": "string",
          "description": "Sri Vallabhacharya"
        },
        "sc": {
          "type": "string",
          "description": "Sri Vallabhacharya's Sanskrit commentary."
        }
      }
    },
    "prabhu": {
      "type": "object",
      "description": "Commentary by A.C. Bhaktivedanta Swami Prabhupada.",
      "properties": {
        "author": {
          "type": "string",
          "description": "A.C. Bhaktivedanta Swami Prabhupada"
        },
        "et": {
          "type": "string",
          "description": "English translation of the commentary."
        },
        "ec": {
          "type": "string",
          "description": "English commentary by the author."
        }
      }
    },
    "tej": {
      "type": "object",
      "description": "Commentary by Swami Tejomayananda.",
      "properties": {
        "author": {
          "type": "string",
          "description": "Swami Tejomayananda"
        },
        "ht": {
          "type": "string",
          "description": "Hindi translation of the commentary."
        }
      }
    }
  },
  "required": ["_id", "chapter", "verse", "slok", "transliteration", "raman", "srid", "vallabh", "prabhu", "tej"]
}
```
---