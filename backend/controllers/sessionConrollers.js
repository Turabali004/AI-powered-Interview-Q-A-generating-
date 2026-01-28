import Session from "../models/Session.js";
import Question from "../models/Question.js";

export const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;
    console.log("sessions body data::::", req.body)

    const userId = req.user._id;
    console.log("sessions ID::::", req.user._id)

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
      // questions
    })

    console.log("Session after creating::::", session)

    const questionsDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id
      })


    )


    session.questions = questionsDocs;
    console.log("QUESTIONS TYPE:", typeof questions, questions);
    console.log("logs of quesitons Docs:",  questionsDocs);

    await session.save()
    res.status(201).json({ success: true, session })
  } catch (error) {
    console.error("CREATE SESSION ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}


export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("questions");

    if (!sessions) {
      return res
        .status(401)
        .response({ status: false, message: "Session not found" })
    }

    res.status(200).json({ success: true, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getSessionById = async (req, res) => { }


export const deleteSession = async (req, res) => {
  try {
    const sessions = await Session.findById(req.params.id)

    if (!sessions) {
      return res
        .status(401)
        .response({ status: false, message: "Session not found" })
    }

    if (sessions.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this session" })
    }

    await Question.deleteMany({ session: sessions._id })

    await sessions.deleteOne();

    res.status(200).json({ message: "Session delete successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};




