# Hugging Face Spaces compatibility layer for Raadhya Tantra
import subprocess
import sys
import os

def main():
    """
    Hugging Face Spaces entry point for Raadhya Tantra
    This script starts the Node.js application on the correct port for HF Spaces
    """
    
    # Set the port for Hugging Face Spaces (default: 7860)
    port = os.environ.get('PORT', '7860')
    os.environ['PORT'] = port
    
    print("🕉️ Starting Raadhya Tantra - Divine AI Wisdom Platform")
    print(f"🌸 Listening on port {port}")
    print("🛡️ Divine protection activated")
    
    try:
        # Start the Node.js application
        process = subprocess.Popen([
            'npm', 'start'
        ], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        
        # Stream output
        for line in iter(process.stdout.readline, ''):
            print(line.rstrip())
            
        process.wait()
        
    except KeyboardInterrupt:
        print("\n🙏 Gracefully shutting down Raadhya Tantra")
        process.terminate()
        sys.exit(0)
    except Exception as e:
        print(f"❌ Error starting Raadhya Tantra: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()