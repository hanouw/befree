import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import { useLocation } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy, dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

// 코드 블록 생성
const CodeBlock = ({ language, code }) => {
  return (
    <SyntaxHighlighter language={language} style={dracula} showLineNumbers>
      {code}
    </SyntaxHighlighter>
  );
};

const CodePage = () => {
  // 어떤 코드인지 받아오기
  const location = useLocation();

  const pageName = { ...location.state }.pageName;

  const signupCode = `---MemberController
    @PostMapping("/email")
    public Map<String, String> sendEmail(@RequestBody String str) {
        String str2 = str.substring(9);
        String email = str2.split("\"")[1];
        log.info("************ MemberController sendEmail:{}", email);
        Member findMember = memberService.getOne(email);
        if (findMember == null) {
            EmailMsgDTO emailMessage = EmailMsgDTO.builder()
                    .to(email)
                    .subject("BeFree 이메일 인증")
                    .build();
            Map<String, String> result = emailService.sendMail(emailMessage);
            String key = result.get("key");
            log.info("*********************이메일인증번호:{}", key);
            return Map.of("key", key, "email", email);
        } else {
            log.info("**************** 이미 가입된 회원임");
            return Map.of("fail", "fail");
        }
    }

--- EmailServiceImpl
public Map<String, String> sendMail(EmailMsgDTO emailMsgDTO) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage(); // MimeMessage 객체 생성
        try {
            // MimeMessageHelper를 사용하여 보다 쉽게 MimeMessage를 구성할 수 있다.
            MimeMessageHelper mimeMessageHelper = null;
            try {
                mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }

            // 이메일 수신자 설정
            mimeMessageHelper.setTo(emailMsgDTO.getTo());

            // 이메일 제목 설정
            mimeMessageHelper.setSubject(emailMsgDTO.getSubject());

            // 본문 내용 설정, false는 HTML 형식의 메세지를 사용하지 않음을 나타낸다.
            StringBuilder key = new StringBuilder(); // 인증번호 담을 String key 변수 생성
            Random random = new Random();
            for (int i = 0; i < 4; i++) {
                int numIndex = random.nextInt(10);
                key.append(numIndex);
            }
            mimeMessageHelper.setText(key + " 입니다.");

            // 이메일 발신자 설정
            mimeMessageHelper.setFrom(new InternetAddress(from));

            // 이메일 보내기
            javaMailSender.send(mimeMessage);
            return Map.of("key", key.toString());

        } catch (MessagingException e) {
            throw  new RuntimeException(e);
        }
    }
  `;

  const draggable = `const DraggableItem = ({
  item,
  index,
  moveCard,
  placeDeleteButtonClick,
  moveDateButtonClick,
  totalPage,
  page,
  refresh,
}) => {
  const placeDeleteButtonClickFn = (pid) => {
    placeDeleteButtonClick(pid);
  };

  const moveDateButtonShow = (pid) => {
    setShowMoveDateModal(!showMoveDateModal);
    setSelectedPid(pid);
  };

  const moveDateButtonCilckFn = (whatDate) => {
    //console.log("moveDateButtonCilckFn, 날짜이동", selectedPid, whatDate);
    moveDateButtonClick(selectedPid, whatDate);
  };

  const [showMoveDateModal, setShowMoveDateModal] = useState(false);
  const [selectedPid, setSelectedPid] = useState(-1);

  const ref = React.useRef(null);

  useEffect(() => {
    setShowMoveDateModal(false);
  }, [refresh]);

  const [, drop] = useDrop({
    accept: ItemType.CARD,
    hover(draggedItem) {
      if (!ref.current) {
        return;
      }
      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      draggedItem.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.CARD,
    item: { type: ItemType.CARD, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 1 : 1,
        transition: "transform 1s ease",
      }}
      className={\`flex justify-between items-center mb-10 px-4 border border-my-color-darkblue rounded-md py-4 text-sm transition-all duration-300 \${
        isDragging ? "bg-gray-100 m-1" : "bg-white"
      }\`}
    >
      <div className="flex items-center">
        <div className="mr-3 cursor-grab hover:bg-gray-300 p-1 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <span className="font-[Pretendard-Regular]">
          {item.pid + 1}. {item.title}
        </span>
      </div>
      <div className="flex items-center">
        <span className="font-[Pretendard-Regular] text-gray-500 mr-6">
          {item.facilities[0]} 외 {item.facilities.length - 1} 개
        </span>
        {showMoveDateModal && selectedPid == item.pid ? (
          <TripListDetailDateMoveModalComponent
            totalPage={totalPage}
            page={page}
            callBackFn={moveDateButtonCilckFn}
          />
        ) : (
          <></>
        )}
        <div
          className="mr-4 cursor-pointer hover:mb-1"
          onClick={() => moveDateButtonShow(item.pid)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25..."
            />
          </svg>
        </div>

        <div
          className="hover:ring-2 hover:ring-slate-300 rounded-2xl mr-2 cursor-pointer"
          onClick={() => placeDeleteButtonClickFn(item.pid)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );`;

  const TripListDetailModifyCode = `items.map((item, index) => (
    <DraggableItem
      key={item.pid}
      item={item}
      index={index}
      moveCard={moveCard}
      placeDeleteButtonClick={placeDeleteButtonClick}
      moveDateButtonClick={moveDateButtonClick}
      totalPage={totalPage}
      page={page}
      refresh={refresh}
    />
  ))`;
  return (
    <>
      <BasicLayout>
        <div className="flex justify-center">
          <div>
            <div className="font-[Pretendard-Bold] text-3xl my-5 grid place-items-center">
              {pageName} 코드
            </div>
            {pageName == "Signup" ? (
              <CodeBlock language="java" code={signupCode} />
            ) : (
              <></>
            )}
            {pageName == "TripListDetailModify" ? (
              <>
                <CodeBlock
                  language="javascript"
                  code={TripListDetailModifyCode}
                />
                <div className="font-[Pretendard-Bold] text-3xl my-5 grid place-items-center">
                  draggable 코드
                </div>
                <CodeBlock language="javascript" code={draggable} />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </BasicLayout>
    </>
  );
};

export default CodePage;
