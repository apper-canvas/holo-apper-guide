import { useState } from 'react';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import AppPromptEditor from '@/components/organisms/AppPromptEditor';
import ExamplePromptsList from '@/components/organisms/ExamplePromptsList';
import GeneratedAppDisplay from '@/components/organisms/GeneratedAppDisplay';
import RecentGenerationsList from '@/components/organisms/RecentGenerationsList';
import InfoBox from '@/components/molecules/InfoBox';

const examplePrompts = [
  {
    title: 'Task Manager',
    prompt: 'Create a simple todo app with:\n- Add new tasks\n- Mark tasks as complete\n- Delete tasks\n- Filter by status\n- Clean, modern design with purple colors'
  },
  {
    title: 'Weather Dashboard',
    prompt: 'Build a weather app that shows:\n- Current weather conditions\n- 5-day forecast\n- Temperature charts\n- Location search\n- Beautiful weather icons'
  },
  {
    title: 'Recipe Collection',
    prompt: 'Design a recipe app with:\n- Recipe cards with images\n- Ingredient lists\n- Cooking instructions\n- Search and filter\n- Rating system'
  },
  {
    title: 'Expense Tracker',
    prompt: 'Create a personal finance app:\n- Add income and expenses\n- Category-based organization\n- Monthly summaries\n- Visual charts\n- Budget tracking'
  }
];

const PlaygroundPage = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedApp, setGeneratedApp] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState([]);

  const simulateApperGeneration = (userPrompt) => {
    const lowerPrompt = userPrompt.toLowerCase();

    // Analyze prompt and generate realistic app structure
    let appType = 'generic';
    let features = [];
    let components = ['App', 'Header', 'MainContent'];

    if (lowerPrompt.includes('todo') || lowerPrompt.includes('task')) {
      appType = 'Task Manager';
      features = ['Add tasks', 'Mark complete', 'Delete tasks', 'Filter by status'];
      components = ['TaskList', 'AddTask', 'TaskItem', 'FilterBar'];
    } else if (lowerPrompt.includes('weather')) {
      appType = 'Weather App';
      features = ['Current weather', 'Forecast', 'Location search', 'Weather icons'];
      components = ['WeatherCard', 'Forecast', 'SearchBar', 'WeatherIcon'];
    } else if (lowerPrompt.includes('recipe') || lowerPrompt.includes('cooking')) {
      appType = 'Recipe App';
      features = ['Recipe cards', 'Ingredients', 'Instructions', 'Search', 'Ratings'];
      components = ['RecipeCard', 'IngredientList', 'Instructions', 'SearchBar'];
    } else if (lowerPrompt.includes('expense') || lowerPrompt.includes('finance') || lowerPrompt.includes('budget')) {
      appType = 'Finance Tracker';
      features = ['Add expenses', 'Categories', 'Charts', 'Budget tracking'];
      components = ['ExpenseForm', 'ExpenseList', 'Chart', 'BudgetTracker'];
    }

    return {
      type: appType,
      features: features,
      components: components,
      description: `A fully functional ${appType.toLowerCase()} with modern design and responsive layout`,
      codeLines: Math.floor(Math.random() * 500) + 200,
      buildTime: '2.3s'
    };
  };

  const generateApp = async () => {
    if (!prompt.trim()) {
      toast.warning('Please enter a prompt to generate your app');
      return;
    }

    setIsGenerating(true);

    // Simulate app generation with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const result = simulateApperGeneration(prompt);
      setGeneratedApp(result);

      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        prompt: prompt,
        result: result,
        timestamp: new Date()
      };
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 9)]); // Keep last 10

      toast.success('App generated successfully!');
    } catch (err) {
      toast.error('Failed to generate app. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const loadExample = (example) => {
    setPrompt(example.prompt);
  };

  const clearPlayground = () => {
    setPrompt('');
    setGeneratedApp(null);
  };

  const handleSelectHistoryItem = (item) => {
    setPrompt(item.prompt);
    setGeneratedApp(item.result);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Playground
          </h1>
          <p className="text-gray-600">
            Experiment with Apper by describing your app ideas. See how your prompts translate into real applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <AppPromptEditor
              prompt={prompt}
              setPrompt={setPrompt}
              isGenerating={isGenerating}
              onGenerateApp={generateApp}
              onClearPlayground={clearPlayground}
            />

            <ExamplePromptsList examples={examplePrompts} onLoadExample={loadExample} />

            <InfoBox title="Pro Tips" iconName="Lightbulb" variant="info">
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Be specific about features and functionality</li>
                <li>• Mention design preferences (colors, style)</li>
                <li>• Include user interactions and data flow</li>
                <li>• Specify responsive behavior if needed</li>
              </ul>
            </InfoBox>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <GeneratedAppDisplay generatedApp={generatedApp} />

            <RecentGenerationsList history={history} onSelectHistoryItem={handleSelectHistoryItem} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundPage;