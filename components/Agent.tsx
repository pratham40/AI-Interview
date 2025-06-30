"use client";
import Image from "next/image";

interface AgentProps {
  username: string;
  userId: string;
  type: string;
}

enum CallStatus {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  CONNECTING = "CONNECTING",
  FINISHED = "FINISHED",
}

function Agent({ username }: AgentProps) {
  const callStatus = CallStatus.ACTIVE;
  const isSpeaking = true;

  const messages = [
    "Hello, I am your AI interview assistant. How can I help you today?",
    "What position are you applying for?",
    "Can you tell me about your previous experience?",
    "What are your strengths and weaknesses?",
  ];

  const lastMessage = messages[messages.length - 1];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8 space-y-8">
      {/* Agent & User Cards */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* AI Agent Card */}
        <div className="bg-white shadow-2xl rounded-xl p-6 flex flex-col items-center w-80 transform hover:scale-105 transition-transform duration-300">
          <div className="relative mb-6">
            <div
              className={`w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center transition-all duration-500 ${
                isSpeaking ? "scale-110 shadow-2xl" : "scale-100 shadow-lg"
              }`}
            >
              <Image
                src="/ai2.jpg"
                alt="AI Agent"
                width={132}
                height={132}
                className="object-cover rounded-full border-4 border-white"
              />
            </div>

            {isSpeaking && (
              <>
                <div className="absolute inset-0 rounded-full border-4 border-blue-300 animate-ping opacity-75"></div>
                <div
                  className="absolute inset-2 rounded-full border-2 border-purple-300 animate-ping opacity-50"
                  style={{ animationDelay: "200ms" }}
                ></div>
                <div
                  className="absolute inset-4 rounded-full border-2 border-indigo-300 animate-ping opacity-25"
                  style={{ animationDelay: "400ms" }}
                ></div>
              </>
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">AI Interview Assistant</h2>
          <p className="text-gray-600 text-center text-sm">Your intelligent interview companion</p>
        </div>

        {/* User Card */}
        <div className="bg-white shadow-2xl rounded-xl p-6 flex flex-col items-center w-80 transform hover:scale-105 transition-transform duration-300">
          <Image
            width={130}
            height={130}
            src="/user.jpg"
            alt="User"
            className="object-cover rounded-full border-4 border-white mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800">{username}</h2>
        </div>
      </div>

      {/* AI Last Message Box */}
      {messages.length > 0 && (
        <div className="bg-white shadow-2xl rounded-xl p-6 w-80 text-center">
          <p className="text-gray-700 italic">“{lastMessage}”</p>
        </div>
      )}

      {/* Call Control Button */}
      <div className="w-full flex justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300">
            {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
              ? "Call"
              : "..."}
          </button>
        ) : (
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 cursor-pointer">
            END CALL
          </button>
        )}
      </div>
    </div>
  );
}

export default Agent;
