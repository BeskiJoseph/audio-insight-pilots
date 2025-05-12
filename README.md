
# CallInsights - Call Sentiment Analysis Application

CallInsights is a web application designed to analyze and visualize sentiment data from call recordings. It helps businesses understand customer interactions by providing detailed analysis of call transcripts, sentiment scores, and key insights.

## Features

- **Dashboard Overview**: View key metrics about your call recordings including sentiment distribution and duration statistics
- **Call Analysis**: Detailed breakdown of each call with sentiment score, transcript, and key insights
- **Sentiment Visualization**: Visual representation of sentiment analysis through charts and graphs
- **Transcript Viewer**: Review call transcripts with sentiment highlighting for each segment
- **Reports**: Generate reports on sentiment trends and common emotion tags across calls

## Technology Stack

- **Frontend**: React with TypeScript
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Charting**: Recharts for data visualization
- **Routing**: React Router for navigation
- **State Management**: Context API for application state

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn package manager

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory
   ```
   cd callinsights
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Upload Calls**: Navigate to the Upload page to add call recordings for analysis
2. **View Dashboard**: See an overview of all call data on the main dashboard
3. **Explore Calls**: Browse through all calls on the Calls page
4. **Analyze Individual Calls**: Click on any call to view detailed sentiment analysis
5. **Generate Reports**: Visit the Reports page to see aggregated data across all calls

## Project Structure

- `/src/components`: Reusable UI components
- `/src/pages`: Main application pages
- `/src/context`: React context for state management
- `/src/types`: TypeScript type definitions
- `/src/utils`: Utility functions for formatting and calculations

## Customization

The application can be customized by:

- Adjusting the color scheme in `tailwind.config.js`
- Modifying the sentiment analysis thresholds in `/src/utils/formatters.ts`
- Adding additional metrics or visualizations to the Reports page

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
