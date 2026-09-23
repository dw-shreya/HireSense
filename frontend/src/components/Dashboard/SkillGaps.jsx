import { AlertTriangle, Target } from "lucide-react";

function SkillGaps({ dashboardData }) {

    const skillGaps = dashboardData?.skillGaps || [];

    return (
        <div className="skill-gaps">

            <div className="skill-gaps-header">

                <div>

                    <div className="dashboard-card-title">

                        <div className="dashboard-small-icon dashboard-icon-amber">
                            <AlertTriangle size={18} />
                        </div>

                        <h3>
                            Skill Gaps
                        </h3>

                    </div>

                    <p>
                        Skills that appear most frequently as gaps
                        across your resume analyses.
                    </p>

                </div>

            </div>


            {skillGaps.length === 0 ? (

                <div className="empty-dashboard-state">

                    <Target size={28} />

                    <p>
                        No skill gaps found.
                    </p>

                </div>

            ) : (

                <div className="skill-gap-list">

                    {skillGaps.map((skill, index) => {

                        const skillName =
                            skill._id || skill.skill;

                        const count =
                            skill.count || 0;

                        const percentage =
                            Math.min(count * 20, 100);

                        return (

                            <div
                                className="skill-gap-item"
                                key={
                                    skillName || index
                                }
                            >

                                <div className="skill-gap-header">

                                    <div className="skill-gap-name">

                                        <span className="skill-rank">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <span>
                                            {skillName}
                                        </span>

                                    </div>

                                    <strong>
                                        {count}
                                    </strong>

                                </div>


                                <div className="skill-gap-bar">

                                    <div
                                        className="skill-gap-fill"
                                        style={{
                                            width: `${percentage}%`,
                                        }}
                                    />

                                </div>


                                <small>
                                    Missing in {count} resume
                                    {count !== 1
                                        ? "s"
                                        : ""}
                                </small>

                            </div>

                        );
                    })}

                </div>

            )}

        </div>
    );
}

export default SkillGaps;