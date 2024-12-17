# White Label React Application

A scalable and customizable white-label React application with built-in support for theming, internationalization, authentication, and dynamic module loading.

## 🏗 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Auth/          # Authentication related components
│   ├── Common/        # Shared/utility components
│   ├── Dashboard/     # Dashboard specific components
│   ├── Layout/        # Layout components (Navbar, etc.)
│   └── Profile/       # Profile related components
├── hooks/             # Custom React hooks
├── i18n/              # Internationalization
│   └── locales/       # Translation files
│       ├── en/        # English translations
│       └── ar/        # Arabic translations
├── pages/             # Page components
├── services/          # API services
├── store/             # Global state management
├── styles/            # Global styles and theme
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 🎨 Theming System

The theme system is built on CSS variables and Tailwind CSS, managed through the `ThemeStore`. It supports:

- Light/Dark modes
- RTL/LTR text direction
- Multiple font families
- Custom color schemes
- Navigation layout preferences

### Theme Configuration

```typescript
interface ThemeSettings {
  mode: 'light' | 'dark';
  direction: 'ltr' | 'rtl';
  font: 'inter' | 'roboto' | 'cairo';
  language: 'en' | 'ar';
  navigation: {
    type: 'top' | 'side';
    collapsed: boolean;
  };
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
}

interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}
```

### Using Theme Colors

Apply theme colors using CSS variables:

```css
.my-component {
  background-color: var(--color-primary);
  color: var(--color-text);
}
```

### Theme Customization

1. **Color Schemes**:
   ```typescript
   const { setTheme } = useThemeStore();
   
   // Update specific colors
   setTheme({
     colors: {
       light: {
         primary: '#3b82f6',
         // other colors...
       }
     }
   });
   ```

2. **Navigation Layout**:
   ```typescript
   // Switch to side navigation
   setTheme({
     navigation: {
       type: 'side',
       collapsed: false
     }
   });
   ```

3. **Language & Direction**:
   ```typescript
   // Switch to Arabic with RTL
   setTheme({
     language: 'ar',
     direction: 'rtl',
     font: 'cairo'
   });
   ```

## 🌐 Internationalization

### Adding New Languages

1. Create new locale files in `src/i18n/locales/<lang>/`
2. Follow the module-based structure:
   ```
   locales/
   ├── en/
   │   ├── auth.json
   │   ├── dashboard.json
   │   └── profile.json
   └── <new-lang>/
       ├── auth.json
       ├── dashboard.json
       └── profile.json
   ```

### Translation Guidelines

1. Use nested objects for better organization
2. Keep keys consistent across languages
3. Use semantic naming for keys

Example:
```json
{
  "moduleName": {
    "section": {
      "key": "Translation value"
    }
  }
}
```

### Using Translations

```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation('moduleName');
  return <h1>{t('section.key')}</h1>;
};
```

## 📦 Module Development

### Module Structure

```
modules/
└── newModule/
    ├── components/     # Module-specific components
    ├── hooks/         # Module-specific hooks
    ├── services/      # API services
    ├── types/         # Type definitions
    └── i18n/          # Translation files
```

### Creating a New Module

1. **Define Module Type**:
   ```typescript
   interface Module {
     id: number;
     name: string;
     actions: ModuleAction[];
   }
   ```

2. **Add Module Routes**:
   ```typescript
   <Route path="/newmodule" element={<NewModule />} />
   ```

3. **Create Module Component**:
   ```typescript
   const NewModule: React.FC = () => {
     const { t } = useTranslation('modules');
     
     return (
       <>
         <div className="flex items-center mb-6">
           <ModuleIcon className="w-8 h-8 text-primary mr-3" />
           <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
             {t('newModule.title')}
           </h1>
         </div>
         <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
           <p className="text-gray-600 dark:text-gray-300">
             {t('newModule.description')}
           </p>
         </div>
       </>
     );
   };
   ```

4. **Add Navigation Icon**:
   ```typescript
   const getModuleIcon = (moduleName: string) => {
     switch (moduleName) {
       case 'NewModule':
         return <NewIcon className="w-5 h-5" />;
       // ...
     }
   };
   ```

### Module Authorization

Modules use JWT claims for authorization:
```typescript
"Rolename-modulename": ["Create", "Read", "Update", "Delete"]
```

The `useModules` hook automatically filters modules based on user permissions:
```typescript
const { data: modules } = useModules();
```

## 🔒 Authentication

### Implementation

- JWT-based authentication
- Automatic token management
- Protected routes
- Role-based access control

### Protected Routes

```typescript
<Route
  path="/protected"
  element={
    <PrivateRoute>
      <ProtectedComponent />
    </PrivateRoute>
  }
/>
```

## 🎯 Best Practices

1. **State Management**
   - Use Zustand for global state
   - Keep state minimal and normalized
   - Follow the store patterns in `authStore` and `themeStore`

2. **Component Design**
   - Keep components small and focused
   - Use TypeScript interfaces
   - Follow the established theming system
   - Implement proper error handling

3. **API Integration**
   - Use the `apiClient` for requests
   - Handle loading and error states
   - Follow the service pattern in `services/`

4. **Styling**
   - Use Tailwind CSS classes
   - Follow the theming system
   - Support RTL layouts
   - Maintain dark mode compatibility

5. **Module Development**
   - Follow the module structure
   - Implement proper authorization
   - Add comprehensive translations
   - Use consistent styling

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## 📝 License

MIT