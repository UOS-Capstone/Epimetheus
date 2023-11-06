package uos.capstone.epimetheus.dtos.llamaTasks;

import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class SubTaskIntro implements SubTaskResolver {

    int stepNo;
    String wrapper;
    ResponseStreamProperty property;

    @Builder
    public SubTaskIntro(int stepNo, String wrapper, ResponseStreamProperty property) {
        this.stepNo = stepNo;
        this.wrapper = wrapper;
        this.property = property;
    }

    @Override
    public int getStepNo() {
        return stepNo;
    }

    public String getWrapper() {
        return wrapper;
    }

    @Override
    public String getProperty() {
        return property.getProperty();
    }
}
