import React, { useState } from "react";
// @ts-ignore
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import styles from "./ChatBot.module.css";

interface IWidget {
  widgetName: string;
  widgetFunc: (props: any) => JSX.Element;
  props?: any[];
  mapStateToProps?: string[];
}

const config: any = {
  initialMessages: [
    {
      id: 1,
      type: "bot",
      message:
        window.localStorage.getItem("botLang") === "tr"
          ? "Merhaba! Bugün ülkeleri keşfetmenize nasıl yardımcı olabilirim? Aşağıdaki konularda size yardımcı olabilirim:\n- Ülke arama\n- Bölgeye göre filtreleme\n- Tema değiştirme\n- Başkentler hakkında bilgi\n- Nüfus bilgisi\n- Dil detayları"
          : "Hello! How can I help you explore countries today? I can help you with:\n- Searching countries\n- Filtering by region\n- Changing theme\n- Capital cities\n- Population information\n- Language details",
    },
  ],
  botName:
    window.localStorage.getItem("botLang") === "tr"
      ? "Dünya Gezgini Bot"
      : "World Explorer Bot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "var(--elements-color)",
      color: "var(--text-color)",
    },
    chatButton: {
      backgroundColor: "var(--elements-color)",
      color: "var(--text-color)",
    },
    userChatMessage: {
      backgroundColor: "#4a4a6a",
      color: "#ffffff",
    },
  },
  widgets: [
    {
      widgetName: "feedback",
      widgetFunc: (props: any) => <FeedbackWidget {...props} />,
      props: [],
      mapStateToProps: [],
    },
  ] as IWidget[],
  customComponents: {
    header: () => (
      <div className={styles.botHeader}>
        <h3>
          {window.localStorage.getItem("botLang") === "tr"
            ? "Dünya Gezgini Asistan"
            : "World Explorer Assistant"}
        </h3>
        <div className={styles.languageSelector}>
          <select
            onChange={(e) => {
              window.localStorage.setItem("botLang", e.target.value);
              window.location.reload();
            }}
            value={window.localStorage.getItem("botLang") || "en"}
          >
            <option value="en">English</option>
            <option value="tr">Türkçe</option>
          </select>
        </div>
      </div>
    ),
  },
};

const FeedbackWidget = ({ setState }: any) => {
  const sendFeedback = (isPositive: boolean) => {
    const lang = window.localStorage.getItem("botLang") || "en";
    setState((state: any) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          id: state.messages.length + 1,
          type: "bot",
          message: isPositive
            ? lang === "tr"
              ? "Olumlu geri bildiriminiz için teşekkür ederim!"
              : "Thank you for your positive feedback!"
            : lang === "tr"
            ? "Bunu duyduğuma üzüldüm. Kendimi geliştirmeye çalışacağım!"
            : "I'm sorry to hear that. I'll try to improve!",
        },
      ],
    }));
  };

  return (
    <div className={styles.feedbackWidget}>
      <button onClick={() => sendFeedback(true)}>👍</button>
      <button onClick={() => sendFeedback(false)}>👎</button>
    </div>
  );
};

const MessageParser = ({ children, actions }: any) => {
  const parse = (message: string) => {
    message = message.toLowerCase();
    const lang = window.localStorage.getItem("botLang") || "en";

    if (
      message.includes("search") ||
      message.includes("find") ||
      message.includes("ara") ||
      message.includes("bul")
    ) {
      actions.handleSearch(lang);
    } else if (
      message.includes("filter") ||
      message.includes("filtre") ||
      message.includes("bölge")
    ) {
      actions.handleFilter(lang);
    } else if (
      message.includes("dark") ||
      message.includes("light") ||
      message.includes("theme") ||
      message.includes("tema") ||
      message.includes("mod")
    ) {
      actions.handleTheme(lang);
    } else if (
      message.includes("capital") ||
      message.includes("başkent") ||
      message.includes("merkez")
    ) {
      actions.handleCapitalInfo(lang);
    } else if (
      message.includes("population") ||
      message.includes("nüfus") ||
      message.includes("kişi")
    ) {
      actions.handlePopulationInfo(lang);
    } else if (
      message.includes("language") ||
      message.includes("dil") ||
      message.includes("konuş")
    ) {
      actions.handleLanguageInfo(lang);
    } else if (
      message.includes("help") ||
      message.includes("yardım") ||
      message.includes("nasıl")
    ) {
      actions.handleDefault(lang);
    } else if (
      message.includes("feedback") ||
      message.includes("geri bildirim") ||
      message.includes("değerlendir")
    ) {
      actions.handleFeedback(lang);
    } else {
      actions.handleDefault(lang);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

const ActionProvider = ({ createChatBotMessage, setState, children }: any) => {
  const messages = {
    en: {
      search:
        "You can use the search bar at the top of the page to find specific countries. Just start typing the country name!",
      filter:
        "You can filter countries by region using the dropdown menu next to the search bar.",
      theme:
        "You can toggle between light and dark mode using the theme switch in the navigation bar.",
      capital:
        "Each country card shows the capital city. Click on a country to see more details about its capital!",
      population:
        "You can see population information on each country card. For detailed demographics, click on the country!",
      language:
        "Click on any country to see detailed information about its official languages and other spoken languages.",
      feedback:
        "How was your experience with the bot? Please use the buttons below to give feedback!",
      default:
        "I can help you with:\n- Searching countries\n- Filtering by region\n- Changing theme\n- Finding capital cities\n- Population information\n- Language details\n\nWhat would you like to know?",
    },
    tr: {
      search:
        "Ülkeleri aramak için sayfanın üst kısmındaki arama çubuğunu kullanabilirsiniz. Ülke adını yazmaya başlayın!",
      filter:
        "Ülkeleri bölgeye göre filtrelemek için arama çubuğunun yanındaki açılır menüyü kullanabilirsiniz.",
      theme:
        "Gezinme çubuğundaki tema düğmesini kullanarak açık ve koyu mod arasında geçiş yapabilirsiniz.",
      capital:
        "Her ülke kartı başkenti gösterir. Başkent hakkında daha fazla bilgi için ülkeye tıklayın!",
      population:
        "Her ülke kartında nüfus bilgisini görebilirsiniz. Detaylı demografik bilgiler için ülkeye tıklayın!",
      language:
        "Resmi diller ve diğer konuşulan diller hakkında detaylı bilgi için herhangi bir ülkeye tıklayın.",
      feedback:
        "Bot deneyiminiz nasıldı? Geri bildirim vermek için lütfen aşağıdaki düğmeleri kullanın!",
      default:
        "Size şu konularda yardımcı olabilirim:\n- Ülke arama\n- Bölgeye göre filtreleme\n- Tema değiştirme\n- Başkentleri bulma\n- Nüfus bilgisi\n- Dil detayları\n\nNe hakkında bilgi almak istersiniz?",
    },
  };

  const createMessage = (key: string, lang: string) => {
    const message = createChatBotMessage(
      messages[lang as keyof typeof messages][
        key as keyof (typeof messages)["en"]
      ]
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  const handleSearch = (lang: string) => createMessage("search", lang);
  const handleFilter = (lang: string) => createMessage("filter", lang);
  const handleTheme = (lang: string) => createMessage("theme", lang);
  const handleCapitalInfo = (lang: string) => createMessage("capital", lang);
  const handlePopulationInfo = (lang: string) =>
    createMessage("population", lang);
  const handleLanguageInfo = (lang: string) => createMessage("language", lang);
  const handleFeedback = (lang: string) => {
    const message = createChatBotMessage(
      messages[lang as keyof typeof messages].feedback,
      {
        widget: "feedback",
      }
    );
    setState((prev: any) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
  const handleDefault = (lang: string) => createMessage("default", lang);

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleSearch,
            handleFilter,
            handleTheme,
            handleCapitalInfo,
            handlePopulationInfo,
            handleLanguageInfo,
            handleFeedback,
            handleDefault,
          },
        });
      })}
    </div>
  );
};

const ChatBotComponent: React.FC = () => {
  const [showBot, setShowBot] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleBot = () => {
    setShowBot(!showBot);
  };

  if (!mounted) return null;

  return (
    <div className={styles.chatbotContainer}>
      {showBot && (
        <div className={styles.chatbotWrapper}>
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            key={window.localStorage.getItem("botLang") || "en"}
          />
        </div>
      )}
      <button
        className={styles.chatbotToggle}
        onClick={toggleBot}
        aria-label={showBot ? "Close chat" : "Open chat"}
      >
        {showBot ? "✕" : "💬"}
      </button>
    </div>
  );
};

export default ChatBotComponent;
