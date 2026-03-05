import cv2

cap = cv2.VideoCapture("http://192.168.31.146:8080/video")

while True:
    ret, frame = cap.read()

    if not ret:
        print("Camera connection failed")
        break

    cv2.imshow("Phone Camera", frame)

    if cv2.waitKey(1) == 27:
        break