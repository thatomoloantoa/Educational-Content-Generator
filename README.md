# Education Content Creator

An AI-powered web application designed to help educators create engaging lesson plans, study guides, and educational materials for high school students (grades 8-12).

## Features

- **Lesson Plan Generator**: Create comprehensive lesson plans with learning objectives, activities, and assessments
- **Study Guide Creator**: Generate detailed study guides covering key concepts and topics
- **Quiz Question Generator**: Create engaging quiz questions for student assessment
- **Assignment Instructions**: Write clear, step-by-step assignment instructions
- **Review Sheet Creator**: Develop comprehensive review materials for exam preparation

## Technology Stack

- **Frontend**: React with TypeScript
- **AI Integration**: Google Gemini API for content generation
- **Styling**: Modern CSS with navy blue gradient design
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd education-content-creator
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
   - Create a `.env` file in the root directory
   - Add your Gemini API key:
   ```
   REACT_APP_GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

## Usage

1. **Select Content Type**: Choose from Lesson Plan, Study Guide, Quiz Questions, Assignment Instructions, or Review Sheet
2. **Enter Subject**: Specify the academic subject (e.g., Mathematics, Science, English, History)
3. **Choose Grade Level**: Select the appropriate grade level (Grade 8, Grades 9-10, or Grades 11-12)
4. **Describe Topic**: Provide a detailed description of the topic or concept you want to create content for
5. **Generate Content**: Click "Generate Content" to create your educational materials
6. **Download**: Save your generated content as a text file

## Design Features

- **Modern UI**: Clean, professional interface with navy blue gradient theme
- **Split Layout**: Input section on the left, output section on the right
- **High School Background**: Educational imagery that resonates with the target audience
- **Responsive Design**: Optimized for all screen sizes
- **Accessibility**: Focus states and keyboard navigation support

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository or contact the development team.
