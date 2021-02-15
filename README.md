Generate openapi schema in django
```
cd server
python manage.py generateschema > openapi-schema.yml
```

Generate .d.ts schema for TypeScript from openapi schema
```
yarn types:generate
```