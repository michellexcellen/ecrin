
from PIL import Image
import os

# Updated source path as requested
source_image_path = r"c:\Users\Louis Winkelmuller\B2dev\michou_bo_premium\public\images\logo2.png"
public_dir = r"c:\Users\Louis Winkelmuller\B2dev\michou_bo_premium\public"

def generate_favicons():
    if not os.path.exists(source_image_path):
        print(f"Error: Source image not found at {source_image_path}")
        return

    try:
        img = Image.open(source_image_path)
        
        # Ensure image is square
        if img.width != img.height:
            print("Warning: Image is not square. Resizing to square (stretching might occur, better crop if needed).")
            # For a logo, usually we want to fit it in a square. 
            # If it's not square, better to paste it on a transparent square background?
            # For now, let's just resize as per standard quick fixes, 
            # unless the aspect ratio is very different.
            pass

        # 1. favicon.ico (multi-size usually 16, 32, 48)
        ico_sizes = [(16, 16), (32, 32), (48, 48)]
        img.save(os.path.join(public_dir, "favicon.ico"), format="ICO", sizes=ico_sizes)
        print("Generated favicon.ico")

        # 2. favicon-48x48.png
        icon_48 = img.resize((48, 48), Image.Resampling.LANCZOS)
        icon_48.save(os.path.join(public_dir, "favicon-48x48.png"), format="PNG")
        print("Generated favicon-48x48.png")

        # 3. favicon-96x96.png
        icon_96 = img.resize((96, 96), Image.Resampling.LANCZOS)
        icon_96.save(os.path.join(public_dir, "favicon-96x96.png"), format="PNG")
        print("Generated favicon-96x96.png")

        # 4. favicon-144x144.png
        icon_144 = img.resize((144, 144), Image.Resampling.LANCZOS)
        icon_144.save(os.path.join(public_dir, "favicon-144x144.png"), format="PNG")
        print("Generated favicon-144x144.png")

        # 5. apple-touch-icon.png (Standard is 180x180)
        apple_icon = img.resize((180, 180), Image.Resampling.LANCZOS)
        apple_icon.save(os.path.join(public_dir, "apple-touch-icon.png"), format="PNG")
        print("Generated apple-touch-icon.png")

        # Cleanup old v0 icons
        files_to_remove = [
            "apple-icon.png",
            "icon-dark-32x32.png",
            "icon-light-32x32.png",
            "icon.svg",
            "placeholder-logo.png",
            "placeholder-logo.svg"
        ]
        
        print("Cleaning up old icons...")
        for file in files_to_remove:
            path = os.path.join(public_dir, file)
            if os.path.exists(path):
                os.remove(path)
                print(f"Removed {file}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    generate_favicons()
