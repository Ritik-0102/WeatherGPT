package app.vercel.weather_gpt_sih.twa;


import com.google.androidbrowserhelper.locationdelegation.LocationDelegationExtraCommandHandler;


public class DelegationService extends
        com.google.androidbrowserhelper.trusted.DelegationService {
    @Override
    public void onCreate() {
        super.onCreate();

        
            registerExtraCommandHandler(new LocationDelegationExtraCommandHandler());
        
    }
}

