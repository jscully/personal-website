import { BlogPost, BlogCategory, BlogTag } from '../types/blog';

// Sample blog posts - replace with your actual content
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    slug: 'getting-started-with-react-and-typescript',
    excerpt: 'Learn how to set up a new project with React and TypeScript and understand the benefits of this powerful combination.',
    content: `
# Getting Started with React and TypeScript

TypeScript has become an essential tool for many React developers. In this post, we'll explore how to set up a new project and why you might want to use TypeScript in your React applications.

## Benefits of TypeScript with React

TypeScript provides several advantages when working with React:

1. **Static Type Checking**: Catch errors during development rather than at runtime
2. **Better IDE Support**: Enhanced autocompletion, navigation, and refactoring
3. **Self-Documenting Code**: Types serve as documentation for your components and functions
4. **Safer Refactoring**: Make changes with confidence

## Setting Up a New Project

The easiest way to start a new React TypeScript project is using Create React App:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

This gives you a fully configured project with all the TypeScript settings you need.

## Writing Your First Component

Here's a simple TypeScript React component:

\`\`\`tsx
import React, { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  color?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, color = 'primary' }) => {
  return (
    <button 
      className={\`button \${color}\`} 
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
\`\`\`

## Conclusion

TypeScript and React make a powerful combination that can improve your development experience and code quality. With proper type definitions, you'll catch errors earlier and have more confidence in your code.
    `,
    coverImage: '/assets/images/blog/typescript-react.jpg',
    publishDate: '2023-05-15',
    author: {
      name: 'Joe Scully',
      avatar: '/assets/images/profile-placeholder.jpg'
    },
    categories: ['Web Development', 'React'],
    tags: ['React', 'TypeScript', 'JavaScript', 'Frontend'],
    readTime: 5,
    likes: 24,
    featured: true
  },
  {
    id: '2',
    title: 'CSS-in-JS vs. Traditional CSS: Pros and Cons',
    slug: 'css-in-js-vs-traditional-css',
    excerpt: 'Explore the differences between CSS-in-JS libraries like styled-components and traditional CSS approaches.',
    content: `
# CSS-in-JS vs. Traditional CSS: Pros and Cons

When it comes to styling React applications, developers have many options. In this post, we'll compare CSS-in-JS approaches with traditional CSS methods.

## Traditional CSS Approaches

### Plain CSS/SCSS Files

\`\`\`css
/* styles.css */
.button {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
}

.button.primary {
  background-color: blue;
  color: white;
}
\`\`\`

### CSS Modules

\`\`\`css
/* Button.module.css */
.button {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
}

.primary {
  background-color: blue;
  color: white;
}
\`\`\`

## CSS-in-JS Approaches

### Styled Components

\`\`\`jsx
import styled from 'styled-components';

const Button = styled.button\`
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
  background-color: \${props => props.primary ? 'blue' : 'gray'};
  color: \${props => props.primary ? 'white' : 'black'};
\`;
\`\`\`

## Pros of CSS-in-JS

1. **Scoped Styles**: No class name collisions
2. **Dynamic Styling**: Easily change styles based on props
3. **Colocated Code**: Keep component logic and styles together
4. **No Unused CSS**: Styles are only included if the component is used

## Pros of Traditional CSS

1. **Separation of Concerns**: Keep styles separate from logic
2. **Caching**: CSS files can be cached separately from JS
3. **Performance**: No runtime style generation
4. **Familiarity**: Follows web standards that have existed for years

## Conclusion

There's no one-size-fits-all solution. CSS-in-JS works well for component-based applications with dynamic styling needs, while traditional CSS might be better for static sites or when working with designers who prefer standard CSS files.

The most important thing is consistency within your project and choosing the approach that fits your team's workflow and application requirements.
    `,
    coverImage: '/assets/images/blog/css-comparison.jpg',
    publishDate: '2023-06-02',
    author: {
      name: 'Your Name',
      avatar: '/assets/images/profile-placeholder.jpg'
    },
    categories: ['Web Development', 'CSS'],
    tags: ['CSS', 'styled-components', 'Frontend', 'React'],
    readTime: 7,
    likes: 18
  },
  {
    id: '3',
    title: 'Building Accessible Web Applications',
    slug: 'building-accessible-web-applications',
    excerpt: 'Learn why accessibility matters and how to implement it in your web projects.',
    content: `
# Building Accessible Web Applications

Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with websites. In this post, we'll explore how to make your React applications more accessible.

## Why Accessibility Matters

- **Ethical Considerations**: Everyone should be able to access information
- **Legal Requirements**: Many countries have laws requiring accessibility
- **Business Benefits**: Larger audience reach and better SEO
- **Better UX for Everyone**: Accessible sites are generally more usable for all users

## Key Accessibility Guidelines

### Semantic HTML

Use appropriate HTML elements for their intended purpose:

\`\`\`jsx
// Bad
<div onClick={handleClick}>Click me</div>

// Good
<button onClick={handleClick}>Click me</button>
\`\`\`

### Keyboard Navigation

Ensure all interactive elements can be accessed and used with a keyboard:

\`\`\`jsx
const NavLink = ({ isActive, children, ...props }) => {
  return (
    <a 
      {...props}
      className={\`nav-link \${isActive ? 'active' : ''}\`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  );
};
\`\`\`

### ARIA Attributes

Use ARIA attributes when necessary to improve accessibility:

\`\`\`jsx
const Dropdown = ({ isOpen, title, children }) => {
  return (
    <div>
      <button 
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
      >
        {title}
      </button>
      <ul 
        id="dropdown-menu" 
        role="menu" 
        hidden={!isOpen}
      >
        {children}
      </ul>
    </div>
  );
};
\`\`\`

### Color Contrast

Ensure text has sufficient contrast against its background:

\`\`\`css
/* Good contrast */
.text {
  color: #333;
  background-color: #fff;
}

/* Poor contrast - avoid */
.text-poor {
  color: #aaa;
  background-color: #eee;
}
\`\`\`

## Testing Accessibility

1. **Automated Testing**: Use tools like Axe, Lighthouse, or WAVE
2. **Keyboard Testing**: Navigate through your site using only a keyboard
3. **Screen Reader Testing**: Use NVDA, VoiceOver, or JAWS
4. **Manual Checklists**: Follow WCAG guidelines

## Conclusion

Accessibility isn't just a checklist item; it's an ongoing process that should be part of your development workflow. By making accessibility a priority, you create better experiences for all users while expanding your audience reach.
    `,
    coverImage: '/assets/images/blog/accessibility.jpg',
    publishDate: '2023-06-20',
    lastUpdated: '2023-06-22',
    author: {
      name: 'Your Name',
      avatar: '/assets/images/profile-placeholder.jpg'
    },
    categories: ['Web Development', 'Accessibility'],
    tags: ['Accessibility', 'WCAG', 'Frontend', 'HTML', 'CSS'],
    readTime: 8,
    likes: 32
  }
];

// Categories
export const blogCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Articles about web development technologies and practices',
    count: 3
  },
  {
    id: '2',
    name: 'React',
    slug: 'react',
    description: 'React.js related tutorials and insights',
    count: 1
  },
  {
    id: '3',
    name: 'CSS',
    slug: 'css',
    description: 'Styling and CSS-related topics',
    count: 1
  },
  {
    id: '4',
    name: 'Accessibility',
    slug: 'accessibility',
    description: 'Making the web accessible to everyone',
    count: 1
  }
];

// Tags
export const blogTags: BlogTag[] = [
  { id: '1', name: 'React', slug: 'react', count: 2 },
  { id: '2', name: 'TypeScript', slug: 'typescript', count: 1 },
  { id: '3', name: 'JavaScript', slug: 'javascript', count: 1 },
  { id: '4', name: 'CSS', slug: 'css', count: 1 },
  { id: '5', name: 'Frontend', slug: 'frontend', count: 3 },
  { id: '6', name: 'Accessibility', slug: 'accessibility', count: 1 },
  { id: '7', name: 'WCAG', slug: 'wcag', count: 1 },
  { id: '8', name: 'HTML', slug: 'html', count: 1 },
  { id: '9', name: 'styled-components', slug: 'styled-components', count: 1 }
];

// Helper function to get blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Helper function to get related posts
export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  // Filter out the current post and get posts that share tags or categories
  return blogPosts
    .filter(post => post.id !== currentPost.id)
    .filter(post => 
      post.tags.some(tag => currentPost.tags.includes(tag)) || 
      post.categories.some(cat => currentPost.categories.includes(cat))
    )
    .slice(0, limit);
};

// Helper function to get posts by category
export const getPostsByCategory = (categorySlug: string): BlogPost[] => {
  const category = blogCategories.find(cat => cat.slug === categorySlug);
  if (!category) return [];
  
  return blogPosts.filter(post => 
    post.categories.includes(category.name)
  );
};

// Helper function to get posts by tag
export const getPostsByTag = (tagSlug: string): BlogPost[] => {
  const tag = blogTags.find(t => t.slug === tagSlug);
  if (!tag) return [];
  
  return blogPosts.filter(post => 
    post.tags.includes(tag.name)
  );
};